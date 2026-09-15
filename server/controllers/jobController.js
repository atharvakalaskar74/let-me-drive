const Job = require('../models/Job');
const Car = require('../models/Car');

// Helper: Haversine distance in kilometers
const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
};

// @desc    Get all open jobs with filtering and search (for drivers and visitors)
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res, next) => {
  try {
    const {
      city,
      lat,
      lng,
      radius,
      jobType,
      minSalary,
      maxSalary,
      requiredExperience,
      status = 'open',
      search,
      page = 1,
      limit = 50
    } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (city && !radius) {
      query['pickupLocation.city'] = new RegExp(city.trim(), 'i');
    }

    if (jobType && jobType !== 'All') {
      query.jobType = jobType;
    }

    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }

    if (requiredExperience) {
      query.requiredExperience = { $lte: Number(requiredExperience) };
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { 'pickupLocation.city': searchRegex },
        { 'pickupLocation.area': searchRegex },
        { 'destination.city': searchRegex }
      ];
    }

    let jobs = await Job.find(query)
      .populate('ownerId', 'name rating totalReviews location profileImage')
      .populate('carId', 'brand model variant year transmission fuelType seatingCapacity')
      .sort({ createdAt: -1 });

    const searchLat = lat ? Number(lat) : null;
    const searchLng = lng ? Number(lng) : null;
    const searchRadius = radius && radius !== 'Any' ? Number(radius) : null;

    if (searchLat !== null && searchLng !== null) {
      jobs = jobs.map(j => {
        const jObj = j.toObject();
        const dist = calculateDistanceKm(searchLat, searchLng, j.pickupLocation?.latitude, j.pickupLocation?.longitude);
        jObj.distanceKm = dist;
        return jObj;
      });

      if (searchRadius) {
        jobs = jobs.filter(j => {
          if (j.distanceKm !== null && j.distanceKm !== undefined) {
            return j.distanceKm <= searchRadius;
          }
          if (city && j.pickupLocation?.city) {
            return j.pickupLocation.city.toLowerCase() === city.toLowerCase();
          }
          return false;
        });
      }

      // Priority: Same-city jobs receive first priority, then closest distance, then newest
      jobs.sort((a, b) => {
        const aSameCity = (city && a.pickupLocation?.city && a.pickupLocation.city.toLowerCase() === city.toLowerCase()) ? 1 : 0;
        const bSameCity = (city && b.pickupLocation?.city && b.pickupLocation.city.toLowerCase() === city.toLowerCase()) ? 1 : 0;
        if (aSameCity !== bSameCity) return bSameCity - aSameCity;

        if (a.distanceKm !== null && b.distanceKm !== null && a.distanceKm !== b.distanceKm) {
          return a.distanceKm - b.distanceKm;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (city) {
      // If coordinates not passed, prioritize same-city exact match first
      jobs.sort((a, b) => {
        const aSameCity = (a.pickupLocation?.city && a.pickupLocation.city.toLowerCase() === city.toLowerCase()) ? 1 : 0;
        const bSameCity = (b.pickupLocation?.city && b.pickupLocation.city.toLowerCase() === city.toLowerCase()) ? 1 : 0;
        if (aSameCity !== bSameCity) return bSameCity - aSameCity;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    const total = jobs.length;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;
    const paginatedJobs = jobs.slice(skip, skip + limitNum);

    res.status(200).json({
      success: true,
      count: paginatedJobs.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      jobs: paginatedJobs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get jobs posted by the currently logged-in owner
// @route   GET /api/jobs/my
// @access  Private (Owner only)
exports.getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ ownerId: req.user.id })
      .populate('carId', 'brand model registrationNumber transmission fuelType')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('ownerId', 'name phone email rating totalReviews location profileImage')
      .populate('carId', 'brand model variant year transmission fuelType seatingCapacity registrationNumber');

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job posting not found' });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new job posting for hiring a driver
// @route   POST /api/jobs
// @access  Private (Owner only)
exports.createJob = async (req, res, next) => {
  try {
    const {
      carId,
      title,
      description,
      jobType,
      pickupLocation,
      destination,
      startDate,
      endDate,
      workingHours,
      salary,
      salaryType,
      requiredExperience,
      requiredLicenseType
    } = req.body;

    if (!title || !description || !jobType || !pickupLocation || !startDate || !salary) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, jobType, pickupLocation, startDate, and salary.'
      });
    }

    // If carId provided, verify it belongs to this owner
    if (carId) {
      const car = await Car.findById(carId);
      if (!car || car.ownerId.toString() !== req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'The selected car does not belong to you.'
        });
      }
    }

    const job = await Job.create({
      ownerId: req.user.id,
      carId: carId || undefined,
      title: title.trim(),
      description: description.trim(),
      jobType,
      pickupLocation,
      destination: destination || {},
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      workingHours: workingHours || 'Flexible',
      salary: Number(salary),
      salaryType: salaryType || 'Daily',
      requiredExperience: requiredExperience ? Number(requiredExperience) : 0,
      requiredLicenseType: requiredLicenseType || 'LMV',
      status: 'open'
    });

    const populatedJob = await Job.findById(job._id)
      .populate('carId', 'brand model registrationNumber transmission');

    res.status(201).json({
      success: true,
      message: 'Driver requirement job posted successfully!',
      job: populatedJob
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing job posting
// @route   PUT /api/jobs/:id
// @access  Private (Owner only)
exports.updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You are not authorized to update this job' });
    }

    const fields = [
      'carId',
      'title',
      'description',
      'jobType',
      'pickupLocation',
      'destination',
      'startDate',
      'endDate',
      'workingHours',
      'salary',
      'salaryType',
      'requiredExperience',
      'requiredLicenseType',
      'status'
    ];

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    await job.save();

    res.status(200).json({
      success: true,
      message: 'Job updated successfully!',
      job
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete or cancel a job posting
// @route   DELETE /api/jobs/:id
// @access  Private (Owner only)
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this job' });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Job posting deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
