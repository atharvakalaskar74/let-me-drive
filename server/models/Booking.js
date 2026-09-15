const mongoose = require('mongoose');

const BookingLocationSchema = new mongoose.Schema({
  state: { type: String, trim: true, default: '' },
  city: { type: String, trim: true, default: '' },
  area: { type: String, trim: true, default: '' },
  address: { type: String, trim: true, default: '' },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null }
}, { _id: false });

const BookingSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
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
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date
  },
  pickupLocation: {
    type: BookingLocationSchema,
    required: true
  },
  destination: {
    type: BookingLocationSchema,
    default: () => ({})
  },
  agreedAmount: {
    type: Number,
    required: [true, 'Agreed payment amount is required'],
    min: 0
  },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'completed', 'cancelled'],
    default: 'upcoming'
  }
}, {
  timestamps: true
});

BookingSchema.index({ ownerId: 1, status: 1 });
BookingSchema.index({ driverId: 1, status: 1 });

module.exports = mongoose.model('Booking', BookingSchema);
