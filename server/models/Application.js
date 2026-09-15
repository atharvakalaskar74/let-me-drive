const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Job reference is required']
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Driver reference is required']
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Application message cannot exceed 500 characters'],
    default: ''
  },
  expectedSalary: {
    type: Number,
    min: [0, 'Salary cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Strictly prevent duplicate applications from the same driver to the same job
ApplicationSchema.index({ jobId: 1, driverId: 1 }, { unique: true });
ApplicationSchema.index({ driverId: 1, status: 1 });
ApplicationSchema.index({ jobId: 1, status: 1 });

module.exports = mongoose.model('Application', ApplicationSchema);
