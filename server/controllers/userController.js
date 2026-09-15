const User = require('../models/User');

// @desc    Get user profile by ID or own profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const {
      name,
      phone,
      age,
      location,
      profileImage,
      // Driver specific
      licenseNumber,
      licenseType,
      experience,
      skills,
      availability,
      preferredJobTypes,
      expectedSalary,
      salaryType
    } = req.body;

    if (name) user.name = name.trim();
    if (phone) user.phone = phone.trim();
    if (age !== undefined) user.age = Number(age);
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (location) {
      const parseCoord = (val, current) => {
        if (val === null || val === '') return null;
        if (val !== undefined && !isNaN(Number(val))) return Number(val);
        return current;
      };
      user.location = {
        state: location.state !== undefined ? location.state : user.location.state,
        city: location.city !== undefined ? location.city : user.location.city,
        area: location.area !== undefined ? location.area : user.location.area,
        latitude: parseCoord(location.latitude, user.location.latitude),
        longitude: parseCoord(location.longitude, user.location.longitude)
      };
    }

    if (user.role === 'driver') {
      if (licenseNumber !== undefined) user.licenseNumber = licenseNumber.trim();
      if (licenseType) user.licenseType = licenseType;
      if (experience !== undefined) user.experience = Number(experience);
      if (skills !== undefined) {
        user.skills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (availability) user.availability = availability;
      if (preferredJobTypes !== undefined) {
        user.preferredJobTypes = Array.isArray(preferredJobTypes) ? preferredJobTypes : [preferredJobTypes];
      }
      if (expectedSalary !== undefined) user.expectedSalary = Number(expectedSalary);
      if (salaryType) user.salaryType = salaryType;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user
    });
  } catch (error) {
    next(error);
  }
};
