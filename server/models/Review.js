const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Booking reference is required'],
    unique: true // Prevents duplicate reviews for the same booking
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner reference is required']
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Driver reference is required']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a star rating between 1 and 5'],
    min: [1, 'Rating must be at least 1 star'],
    max: [5, 'Rating cannot exceed 5 stars']
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [1000, 'Review comment cannot exceed 1000 characters'],
    default: ''
  }
}, {
  timestamps: true
});

ReviewSchema.index({ driverId: 1 });
ReviewSchema.index({ ownerId: 1 });

module.exports = mongoose.model('Review', ReviewSchema);
