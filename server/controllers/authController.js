const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'let_me_drive_jwt_secret_fallback_key',
    { expiresIn: '7d' }
  );
};

// @desc    Register a new user (Car Owner or Driver)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      age,
      role,
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

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, password, and role.'
      });
    }

    if (!['owner', 'driver'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be either "owner" or "driver".'
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone ? phone.trim() : '',
      age: age ? Number(age) : undefined,
      role,
      location: location || {},
      profileImage: profileImage || ''
    };

    if (role === 'driver') {
      userData.licenseNumber = licenseNumber ? licenseNumber.trim() : '';
      userData.licenseType = licenseType || 'LMV';
      userData.experience = experience ? Number(experience) : 0;
      userData.skills = Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : []);
      userData.availability = availability || 'Available';
      userData.preferredJobTypes = Array.isArray(preferredJobTypes) ? preferredJobTypes : ['Temporary', 'One Day'];
      userData.expectedSalary = expectedSalary ? Number(expectedSalary) : 0;
      userData.salaryType = salaryType || 'Daily';
    }

    const user = await User.create(userData);
    const token = generateToken(user._id);

    // Sanitize user output
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      token,
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Log in user & get JWT token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    const token = generateToken(user._id);
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};
