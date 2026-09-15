const Review = require('../models/Review');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Submit a review and rating for a completed booking
// @route   POST /api/reviews
// @access  Private (Owner only)
exports.createReview = async (req, res, next) => {
  try {
    const { bookingId, rating, comment } = req.body;

    if (!bookingId || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Please provide bookingId and a rating (1-5).'
      });
    }

    const numRating = Number(rating);
    if (numRating < 1 || numRating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5 stars.'
      });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Only the car owner of this booking can submit a review'
      });
    }

    if (booking.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'You can only review a booking after it has been marked completed.'
      });
    }

    // Check if review already exists for this booking
    const existing = await Review.findOne({ bookingId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this booking.'
      });
    }

    const review = await Review.create({
      bookingId,
      ownerId: req.user.id,
      driverId: booking.driverId,
      rating: numRating,
      comment: comment ? comment.trim() : ''
    });

    // Recalculate driver's aggregate rating and total reviews
    const allReviews = await Review.find({ driverId: booking.driverId });
    const totalReviews = allReviews.length;
    const avgRating =
      totalReviews > 0
        ? Math.round((allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews) * 10) / 10
        : numRating;

    await User.findByIdAndUpdate(booking.driverId, {
      rating: avgRating,
      totalReviews: totalReviews
    });

    // Notify driver about new review
    await Notification.create({
      recipientId: booking.driverId,
      type: 'review_received',
      title: 'New Rating & Review Received',
      message: `${req.user.name} rated you ${numRating} ★: "${comment || 'Excellent service!'}"`,
      relatedId: review._id
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully! Thank you for rating your driver.',
      review,
      driverRating: avgRating,
      totalReviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews for a specific driver
// @route   GET /api/reviews/driver/:driverId
// @access  Public
exports.getDriverReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ driverId: req.params.driverId })
      .populate('ownerId', 'name location.city profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    next(error);
  }
};
