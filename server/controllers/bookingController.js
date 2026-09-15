const Booking = require('../models/Booking');
const Job = require('../models/Job');
const Notification = require('../models/Notification');

// @desc    Get all bookings for the authenticated user (Owner or Driver)
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};

    if (req.user.role === 'owner') {
      query.ownerId = req.user.id;
    } else {
      query.driverId = req.user.id;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('ownerId', 'name phone email location profileImage')
      .populate('driverId', 'name phone email licenseType experience rating totalReviews location profileImage skills')
      .populate('carId', 'brand model variant year registrationNumber transmission fuelType')
      .populate('jobId', 'title jobType workingHours')
      .sort({ startDate: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('ownerId', 'name phone email location profileImage')
      .populate('driverId', 'name phone email licenseType experience rating totalReviews location profileImage skills')
      .populate('carId', 'brand model variant year registrationNumber transmission fuelType seatingCapacity')
      .populate('jobId', 'title description jobType workingHours');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Authorization check
    const isOwner = booking.ownerId._id.toString() === req.user.id;
    const isDriver = booking.driverId._id.toString() === req.user.id;

    if (!isOwner && !isDriver) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this booking' });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status (active, completed, cancelled)
// @route   PUT /api/bookings/:id/status
// @access  Private
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['upcoming', 'active', 'completed', 'cancelled'];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${allowed.join(', ')}`
      });
    }

    const booking = await Booking.findById(req.params.id)
      .populate('ownerId', 'name')
      .populate('driverId', 'name')
      .populate('jobId');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const isOwner = booking.ownerId._id.toString() === req.user.id;
    const isDriver = booking.driverId._id.toString() === req.user.id;

    if (!isOwner && !isDriver) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this booking' });
    }

    booking.status = status;
    await booking.save();

    // If completed, also update the related job to completed
    if (status === 'completed' && booking.jobId) {
      await Job.findByIdAndUpdate(booking.jobId._id, { status: 'completed' });

      // Notify owner to leave a review
      if (isDriver) {
        await Notification.create({
          recipientId: booking.ownerId._id,
          type: 'booking_completed',
          title: 'Booking Completed - Rate Driver',
          message: `${booking.driverId.name} marked the driving service as completed. Please rate and review your driver!`,
          relatedId: booking._id
        });
      } else {
        await Notification.create({
          recipientId: booking.driverId._id,
          type: 'booking_completed',
          title: 'Booking Marked Completed',
          message: `${booking.ownerId.name} marked the driving service as completed.`,
          relatedId: booking._id
        });
      }
    } else if (status === 'cancelled') {
      if (booking.jobId) {
        await Job.findByIdAndUpdate(booking.jobId._id, { status: 'cancelled' });
      }
      const otherId = isOwner ? booking.driverId._id : booking.ownerId._id;
      await Notification.create({
        recipientId: otherId,
        type: 'system',
        title: 'Booking Cancelled',
        message: `The booking for ${booking.jobId ? booking.jobId.title : 'driving service'} was cancelled.`,
        relatedId: booking._id
      });
    }

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking
    });
  } catch (error) {
    next(error);
  }
};
