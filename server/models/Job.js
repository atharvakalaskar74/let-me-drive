const mongoose = require('mongoose');

const JobPointSchema = new mongoose.Schema({
  state: { type: String, trim: true, default: '' },
  city: { type: String, trim: true, default: '' },
  area: { type: String, trim: true, default: '' },
  address: { type: String, trim: true, default: '' },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null }
}, { _id: false });

const JobSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Job must belong to an owner']
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide job details/description'],
    trim: true
  },
  jobType: {
    type: String,
    enum: ['Permanent', 'Temporary', 'One Day', 'Hourly', 'Outstation', 'Round Trip'],
    required: [true, 'Please select a job type']
  },
  pickupLocation: {
    type: JobPointSchema,
    required: true
  },
  destination: {
    type: JobPointSchema,
    default: () => ({})
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide a start date']
  },
  endDate: {
    type: Date
  },
  workingHours: {
    type: String,
    trim: true,
    default: 'Flexible'
  },
  salary: {
    type: Number,
    required: [true, 'Please specify the salary/rate offer'],
    min: [0, 'Salary cannot be negative']
  },
  salaryType: {
    type: String,
    enum: ['Fixed', 'Hourly', 'Daily', 'Monthly'],
    default: 'Daily'
  },
  requiredExperience: {
    type: Number,
    default: 0,
    min: 0
  },
  requiredLicenseType: {
    type: String,
    enum: ['LMV', 'HMV', 'Commercial', 'Automatic Only', 'All'],
    default: 'LMV'
  },
  status: {
    type: String,
    enum: ['open', 'assigned', 'completed', 'cancelled'],
    default: 'open'
  }
}, {
  timestamps: true
});

JobSchema.index({ status: 1, 'pickupLocation.city': 1 });
JobSchema.index({ jobType: 1 });
JobSchema.index({ ownerId: 1 });

module.exports = mongoose.model('Job', JobSchema);
