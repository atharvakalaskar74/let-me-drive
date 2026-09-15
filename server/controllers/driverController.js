const User = require('../models/User');
const Job = require('../models/Job');
const Review = require('../models/Review');

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

// Explainable recommendation score calculator
const calculateMatchScore = (driver, criteria) => {
  const {
    city = '',
    state = '',
    area = '',
    lat = null,
    lng = null,
    requiredExperience = 1,
    requiredLicenseType = 'LMV',
    jobType = 'Temporary'
  } = criteria;

  const breakdown = {
    location: 0,
    experience: 0,
    rating: 0,
    availability: 0,
    license: 0,
    jobPreference: 0
  };
  const reasons = [];

  // 1. Location Match (Max 30) - Strongest factor
  const dLat = driver.location?.latitude;
  const dLng = driver.location?.longitude;
  const distanceKm = calculateDistanceKm(lat, lng, dLat, dLng);
  const targetCity = (city || '').trim().toLowerCase();
  const driverCity = (driver.location?.city || '').trim().toLowerCase();
  const isSameCity = targetCity && driverCity && targetCity === driverCity;

  if (distanceKm !== null && distanceKm !== undefined) {
    if (isSameCity) {
      reasons.push(`Same city (${driver.location.city})`);
    }
    if (distanceKm <= 10) {
      breakdown.location = 30;
      reasons.push(`Nearby location (approx ${distanceKm} km away)`);
    } else if (distanceKm <= 25) {
      breakdown.location = isSameCity ? 28 : 25;
      reasons.push(`Nearby proximity (approx ${distanceKm} km away)`);
    } else if (distanceKm <= 50) {
      breakdown.location = isSameCity ? 24 : 18;
      reasons.push(`Surrounding metropolitan area (~${distanceKm} km)`);
    } else {
      breakdown.location = isSameCity ? 20 : 10;
      reasons.push(`Extended distance (~${distanceKm} km)`);
    }
  } else {
    // Fallback: City and area comparison
    const targetArea = (area || '').trim().toLowerCase();
    const driverArea = (driver.location?.area || '').trim().toLowerCase();

    if (isSameCity) {
      reasons.push(`Same city (${driver.location.city})`);
      if (targetArea && driverArea && targetArea === driverArea) {
        breakdown.location = 30;
        reasons.push(`Nearby area (${driver.location.area})`);
      } else {
        breakdown.location = 28;
      }
    } else if (state && driver.location?.state && state.toLowerCase() === driver.location.state.toLowerCase()) {
      breakdown.location = 12;
      reasons.push(`Same state (${driver.location.state})`);
    } else {
      breakdown.location = 6;
      reasons.push(`Operating in ${driver.location?.city || 'another city'}`);
    }
  }

  // 2. Experience Match (Max 20)
  const exp = Number(driver.experience) || 0;
  const reqExp = Number(requiredExperience) || 1;

  if (exp >= reqExp + 5) {
    breakdown.experience = 20;
    reasons.push(`Extensive experience (${exp} yrs exceeds requirement of ${reqExp} yrs)`);
  } else if (exp >= reqExp) {
    breakdown.experience = 18;
    reasons.push(`Solid experience (${exp} yrs meets requirement of ${reqExp} yrs)`);
  } else if (exp > 0) {
    const ratio = Math.min(exp / Math.max(reqExp, 1), 1);
    breakdown.experience = Math.round(ratio * 14);
    reasons.push(`Has ${exp} years of driving experience`);
  } else {
    breakdown.experience = 5;
    reasons.push('New/novice professional driver');
  }

  // 3. Rating Match (Max 15)
  const rating = Number(driver.rating) || 4.0;
  const ratingScore = Math.min(Math.round((rating / 5) * 15 * 10) / 10, 15);
  breakdown.rating = ratingScore;
  if (rating >= 4.5) {
    reasons.push(`Outstanding client rating (${rating.toFixed(1)} ★ from ${driver.totalReviews || 0} reviews)`);
  } else if (rating >= 3.5) {
    reasons.push(`Good track record (${rating.toFixed(1)} ★)`);
  } else {
    reasons.push(`Rating score: ${rating.toFixed(1)} ★`);
  }

  // 4. Availability Match (Max 15)
  if (driver.availability === 'Available') {
    breakdown.availability = 15;
    reasons.push('Immediately available for duty');
  } else if (driver.availability === 'Busy') {
    breakdown.availability = 5;
    reasons.push('Currently assigned to other bookings');
  } else {
    breakdown.availability = 0;
    reasons.push('Currently marked on leave');
  }

  // 5. License Compatibility (Max 10)
  const dLicense = (driver.licenseType || 'LMV').toUpperCase();
  const rLicense = (requiredLicenseType || 'LMV').toUpperCase();

  const licenseRank = {
    'AUTOMATIC ONLY': 1,
    'LMV': 2,
    'COMMERCIAL': 3,
    'HMV': 4,
    'ALL': 5
  };

  const driverRank = licenseRank[dLicense] || 2;
  const requiredRank = licenseRank[rLicense] || 2;

  if (dLicense === 'ALL' || driverRank >= requiredRank) {
    breakdown.license = 10;
    reasons.push(`Compatible license (${driver.licenseType}) for vehicle requirement`);
  } else {
    breakdown.license = 5;
    reasons.push(`Holds ${driver.licenseType} license`);
  }

  // 6. Job Preference Match (Max 10)
  const preferences = driver.preferredJobTypes || [];
  if (jobType && preferences.some(p => p.toLowerCase() === jobType.toLowerCase())) {
    breakdown.jobPreference = 10;
    reasons.push(`Specifically interested in ${jobType} jobs`);
  } else if (preferences.length >= 3) {
    breakdown.jobPreference = 8;
    reasons.push('Flexible across multiple job formats');
  } else {
    breakdown.jobPreference = 4;
    reasons.push(`Prefers ${preferences.join(', ') || 'general'} assignments`);
  }

  const matchScore = Math.min(
    100,
    Math.round(
      breakdown.location +
      breakdown.experience +
      breakdown.rating +
      breakdown.availability +
      breakdown.license +
      breakdown.jobPreference
    )
  );

  return {
    matchScore,
    breakdown,
    reasons
  };
};

// @desc    Get list of all drivers with filtering and search
// @route   GET /api/drivers
// @access  Public
exports.getDrivers = async (req, res, next) => {
  try {
    const {
      city,
      area,
      lat,
      lng,
      radius,
      minExperience,
      licenseType,
      availability,
      jobType,
      minRating,
      search,
      page = 1,
      limit = 50
    } = req.query;

    const query = { role: 'driver', isActive: true };

    if (city && !radius) {
      query['location.city'] = new RegExp(city.trim(), 'i');
    }
    if (area) {
      query['location.area'] = new RegExp(area.trim(), 'i');
    }
    if (minExperience) {
      query.experience = { $gte: Number(minExperience) };
    }
    if (licenseType && licenseType !== 'All') {
      query.licenseType = licenseType;
    }
    if (availability && availability !== 'All') {
      query.availability = availability;
    }
    if (jobType) {
      query.preferredJobTypes = jobType;
    }
    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }
    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { skills: searchRegex },
        { 'location.city': searchRegex },
        { 'location.area': searchRegex }
      ];
    }

    let drivers = await User.find(query)
      .select('-password')
      .sort({ rating: -1, experience: -1 });

    const searchLat = lat ? Number(lat) : null;
    const searchLng = lng ? Number(lng) : null;
    const searchRadius = radius && radius !== 'Any' ? Number(radius) : null;

    if (searchLat !== null && searchLng !== null) {
      drivers = drivers.map(d => {
        const dObj = d.toObject();
        const dist = calculateDistanceKm(searchLat, searchLng, d.location?.latitude, d.location?.longitude);
        dObj.distanceKm = dist;
        return dObj;
      });

      if (searchRadius) {
        drivers = drivers.filter(d => {
          if (d.distanceKm !== null && d.distanceKm !== undefined) {
            return d.distanceKm <= searchRadius;
          }
          // If driver coordinates are missing, fallback to city name match
          if (city && d.location?.city) {
            return d.location.city.toLowerCase() === city.toLowerCase();
          }
          return false;
        });
      }

      // Priority: Same-city drivers receive first priority, then closest distance, then rating
      drivers.sort((a, b) => {
        const aSameCity = (city && a.location?.city && a.location.city.toLowerCase() === city.toLowerCase()) ? 1 : 0;
        const bSameCity = (city && b.location?.city && b.location.city.toLowerCase() === city.toLowerCase()) ? 1 : 0;
        if (aSameCity !== bSameCity) return bSameCity - aSameCity;

        if (a.distanceKm !== null && b.distanceKm !== null && a.distanceKm !== b.distanceKm) {
          return a.distanceKm - b.distanceKm;
        }
        return (b.rating || 0) - (a.rating || 0);
      });
    } else if (city) {
      // If coordinates not passed, sort same-city exact match first
      drivers.sort((a, b) => {
        const aSameCity = (a.location?.city && a.location.city.toLowerCase() === city.toLowerCase()) ? 1 : 0;
        const bSameCity = (b.location?.city && b.location.city.toLowerCase() === city.toLowerCase()) ? 1 : 0;
        if (aSameCity !== bSameCity) return bSameCity - aSameCity;
        return (b.rating || 0) - (a.rating || 0);
      });
    }

    const total = drivers.length;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;
    const paginatedDrivers = drivers.slice(skip, skip + limitNum);

    res.status(200).json({
      success: true,
      count: paginatedDrivers.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      drivers: paginatedDrivers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single driver public profile
// @route   GET /api/drivers/:id
// @access  Public
exports.getDriverById = async (req, res, next) => {
  try {
    const driver = await User.findOne({ _id: req.params.id, role: 'driver' }).select('-password');
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    // Also fetch completed reviews for this driver
    const reviews = await Review.find({ driverId: driver._id })
      .populate('ownerId', 'name profileImage location.city')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      driver,
      reviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI Recommended Drivers with explainable match scores
// @route   GET /api/drivers/recommended
// @access  Public (Optionally authenticated to use owner's active job/profile)
exports.getRecommendedDrivers = async (req, res, next) => {
  try {
    const {
      jobId,
      city,
      state,
      area,
      lat,
      lng,
      radius,
      requiredExperience,
      requiredLicenseType,
      jobType
    } = req.query;

    let criteria = {
      city: city || '',
      state: state || '',
      area: area || '',
      lat: lat ? Number(lat) : null,
      lng: lng ? Number(lng) : null,
      radius: radius && radius !== 'Any' ? Number(radius) : null,
      requiredExperience: requiredExperience ? Number(requiredExperience) : 2,
      requiredLicenseType: requiredLicenseType || 'LMV',
      jobType: jobType || 'Temporary'
    };

    // If a jobId is provided, ground the recommendation in the specific job requirements
    if (jobId) {
      const job = await Job.findById(jobId);
      if (job) {
        criteria.city = job.pickupLocation?.city || criteria.city;
        criteria.state = job.pickupLocation?.state || criteria.state;
        criteria.area = job.pickupLocation?.area || criteria.area;
        criteria.lat = job.pickupLocation?.latitude || criteria.lat;
        criteria.lng = job.pickupLocation?.longitude || criteria.lng;
        criteria.requiredExperience = job.requiredExperience || criteria.requiredExperience;
        criteria.requiredLicenseType = job.requiredLicenseType || criteria.requiredLicenseType;
        criteria.jobType = job.jobType || criteria.jobType;
      }
    } else if (req.user && req.user.role === 'owner') {
      // If logged in as owner without specific job, default to owner's location & first active job if exists
      const activeJob = await Job.findOne({ ownerId: req.user._id, status: 'open' }).sort({ createdAt: -1 });
      if (activeJob) {
        criteria.city = activeJob.pickupLocation?.city || req.user.location?.city || criteria.city;
        criteria.state = activeJob.pickupLocation?.state || req.user.location?.state || criteria.state;
        criteria.requiredExperience = activeJob.requiredExperience || criteria.requiredExperience;
        criteria.requiredLicenseType = activeJob.requiredLicenseType || criteria.requiredLicenseType;
        criteria.jobType = activeJob.jobType || criteria.jobType;
      } else if (req.user.location?.city) {
        criteria.city = req.user.location.city;
        criteria.state = req.user.location.state || '';
      }
    }

    // Fetch all active drivers
    const drivers = await User.find({ role: 'driver', isActive: true }).select('-password');

    // Score and rank each driver deterministically
    let scoredDrivers = drivers.map(driver => {
      const { matchScore, breakdown, reasons } = calculateMatchScore(driver, criteria);
      const dist = calculateDistanceKm(criteria.lat, criteria.lng, driver.location?.latitude, driver.location?.longitude);
      return {
        driver,
        matchScore,
        breakdown,
        reasons,
        distanceKm: dist
      };
    });

    if (criteria.radius && criteria.lat !== null && criteria.lng !== null) {
      scoredDrivers = scoredDrivers.filter(r => {
        if (r.distanceKm !== null && r.distanceKm !== undefined) {
          return r.distanceKm <= criteria.radius;
        }
        if (criteria.city && r.driver.location?.city) {
          return r.driver.location.city.toLowerCase() === criteria.city.toLowerCase();
        }
        return false;
      });
    }

    // Sort in descending order of AI match score
    scoredDrivers.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({
      success: true,
      count: scoredDrivers.length,
      criteria,
      recommendations: scoredDrivers
    });
  } catch (error) {
    next(error);
  }
};
