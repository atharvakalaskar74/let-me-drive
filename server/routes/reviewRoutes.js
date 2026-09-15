const express = require('express');
const router = express.Router();
const {
  createReview,
  getDriverReviews
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.post('/', protect, authorize('owner'), createReview);
router.get('/driver/:driverId', getDriverReviews);

module.exports = router;
