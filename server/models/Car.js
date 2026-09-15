const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Car must belong to an owner']
  },
  brand: {
    type: String,
    required: [true, 'Car brand is required (e.g. Toyota, Honda, Hyundai)'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Car model is required (e.g. Innova, City, Creta)'],
    trim: true
  },
  variant: {
    type: String,
    trim: true,
    default: ''
  },
  year: {
    type: Number,
    required: [true, 'Manufacturing year is required'],
    min: [1990, 'Year must be after 1990'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  registrationNumber: {
    type: String,
    required: [true, 'Registration number is required (e.g. MH12AB1234)'],
    trim: true,
    uppercase: true
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'CNG', 'Hybrid'],
    default: 'Petrol'
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic'],
    default: 'Manual'
  },
  seatingCapacity: {
    type: Number,
    default: 5,
    min: 2,
    max: 12
  },
  carImage: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

CarSchema.index({ ownerId: 1 });
CarSchema.index({ registrationNumber: 1 });

module.exports = mongoose.model('Car', CarSchema);
