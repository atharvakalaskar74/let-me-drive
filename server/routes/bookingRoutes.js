const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBookingById,
  updateBookingStatus
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getBookings);
router.get('/:id', getBookingById);
router.put('/:id/status', updateBookingStatus);

module.exports = router;
