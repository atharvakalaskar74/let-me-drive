const Application = require('../models/Application');
const Job = require('../models/Job');
const Booking = require('../models/Booking');
const Notification = require('../models/Notification');

// @desc    Apply for an open driver job
// @route   POST /api/applications
// @access  Private (Driver only)
exports.applyForJob = async (req, res, next) => {
  try {
    const { jobId, message, expectedSalary } = req.body;

    if (!jobId) {
      return res.status(400).json({ success: false, message: 'Please provide a valid jobId' });
    }

    const job = await Job.findById(jobId).populate('ownerId');
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'This job is no longer accepting applications (Status: ' + job.status + ').'
      });
    }

    // Check if driver already applied to this job
    const existing = await Application.findOne({ jobId, driverId: req.user.id });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job.'
      });
    }

    const application = await Application.create({
      jobId,
      driverId: req.user.id,
      message: message ? message.trim() : '',
      expectedSalary: expectedSalary ? Number(expectedSalary) : job.salary,
      status: 'pending'
    });

    // Notify the job owner
    await Notification.create({
      recipientId: job.ownerId._id,
      type: 'application_received',
      title: 'New Driver Application Received',
      message: `${req.user.name} applied for your job: "${job.title}".`,
      relatedId: application._id
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      application
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get applications submitted by the logged-in driver
// @route   GET /api/applications/my
// @access  Private (Driver only)
exports.getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ driverId: req.user.id })
      .populate({
        path: 'jobId',
        populate: [
          { path: 'ownerId', select: 'name phone email location profileImage' },
          { path: 'carId', select: 'brand model variant year transmission' }
        ]
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applications received for a specific job
// @route   GET /api/applications/job/:jobId
// @access  Private (Owner only)
exports.getJobApplications = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view applications for this job'
      });
    }

    const applications = await Application.find({ jobId: job._id })
      .populate('driverId', 'name phone email age experience licenseType licenseNumber rating totalReviews skills availability location profileImage expectedSalary salaryType')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      job,
      applications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Accept a driver application and generate a confirmed booking
// @route   PUT /api/applications/:id/accept
// @access  Private (Owner only)
exports.acceptApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('jobId')
      .populate('driverId');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const job = await Job.findById(application.jobId._id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Associated job not found' });
    }

    if (job.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to accept applications for this job'
      });
    }

    if (job.status === 'assigned') {
      return res.status(400).json({
        success: false,
        message: 'This job has already been assigned to another driver.'
      });
    }

    // 1. Mark this application accepted
    application.status = 'accepted';
    await application.save();

    // 2. Mark the job assigned
    job.status = 'assigned';
    await job.save();

    // 3. Reject any other pending applications for this job to keep database consistent
    await Application.updateMany(
      { jobId: job._id, _id: { $ne: application._id }, status: 'pending' },
      { status: 'rejected' }
    );

    // 4. Create the confirmed Booking record
    const booking = await Booking.create({
      jobId: job._id,
      applicationId: application._id,
      ownerId: req.user.id,
      driverId: application.driverId._id,
      carId: job.carId,
      startDate: job.startDate,
      endDate: job.endDate || job.startDate,
      pickupLocation: job.pickupLocation,
      destination: job.destination,
      agreedAmount: application.expectedSalary || job.salary,
      status: 'upcoming'
    });

    // 5. Notify Driver
    await Notification.create({
      recipientId: application.driverId._id,
      type: 'application_accepted',
      title: 'Congratulations! Application Accepted',
      message: `${req.user.name} has accepted your application for "${job.title}". A confirmed booking has been created.`,
      relatedId: booking._id
    });

    // 6. Notify Owner
    await Notification.create({
      recipientId: req.user.id,
      type: 'booking_created',
      title: 'Booking Confirmed with Driver',
      message: `You have successfully hired ${application.driverId.name} for "${job.title}".`,
      relatedId: booking._id
    });

    res.status(200).json({
      success: true,
      message: `Driver ${application.driverId.name} has been hired successfully! Booking created.`,
      booking,
      application
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject a driver application
// @route   PUT /api/applications/:id/reject
// @access  Private (Owner only)
exports.rejectApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id).populate('jobId');
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const job = await Job.findById(application.jobId._id);
    if (!job || job.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to reject applications for this job'
      });
    }

    application.status = 'rejected';
    await application.save();

    // Notify Driver
    await Notification.create({
      recipientId: application.driverId,
      type: 'application_rejected',
      title: 'Application Update',
      message: `Your application for "${job.title}" was not selected by the car owner.`,
      relatedId: application._id
    });

    res.status(200).json({
      success: true,
      message: 'Application rejected',
      application
    });
  } catch (error) {
    next(error);
  }
};
