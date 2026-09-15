const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  getDrivers,
  getDriverById,
  getRecommendedDrivers
} = require('../controllers/driverController');

// Optional auth middleware: populates req.user if Bearer token present, but doesn't block if absent
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'let_me_drive_jwt_secret_fallback_key');
      req.user = await User.findById(decoded.id);
    } catch (err) {
      // Ignore error for optional auth
    }
  }
  next();
};

router.get('/', getDrivers);
router.get('/recommended', optionalAuth, getRecommendedDrivers);
router.get('/:id', getDriverById);

module.exports = router;
