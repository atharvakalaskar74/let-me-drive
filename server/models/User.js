const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const LocationSchema = new mongoose.Schema({
  state: { type: String, trim: true, default: '' },
  city: { type: String, trim: true, default: '' },
  area: { type: String, trim: true, default: '' },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true,
    maxlength: [60, 'Name cannot exceed 60 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  phone: {
    type: String,
    required: [true, 'Please provide a contact phone number'],
    trim: true
  },
  age: {
    type: Number,
    min: [18, 'Age must be at least 18'],
    max: [80, 'Age cannot exceed 80']
  },
  role: {
    type: String,
    enum: {
      values: ['owner', 'driver'],
      message: '{VALUE} is not a supported role'
    },
    required: [true, 'Please specify your role (owner or driver)']
  },
  location: {
    type: LocationSchema,
    default: () => ({})
  },
  profileImage: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },

  // Driver-specific fields
  licenseNumber: {
    type: String,
    trim: true,
    default: ''
  },
  licenseType: {
    type: String,
    enum: ['LMV', 'HMV', 'Commercial', 'Automatic Only', 'All'],
    default: 'LMV'
  },
  experience: {
    type: Number,
    default: 0,
    min: [0, 'Experience cannot be negative']
  },
  skills: {
    type: [String],
    default: []
  },
  availability: {
    type: String,
    enum: ['Available', 'Busy', 'On Leave'],
    default: 'Available'
  },
  preferredJobTypes: {
    type: [String],
    enum: ['Permanent', 'Temporary', 'One Day', 'Hourly', 'Outstation', 'Round Trip'],
    default: ['Temporary', 'One Day', 'Hourly']
  },
  expectedSalary: {
    type: Number,
    default: 0
  },
  salaryType: {
    type: String,
    enum: ['Hourly', 'Daily', 'Monthly'],
    default: 'Daily'
  },
  rating: {
    type: Number,
    default: 5.0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for high performance searches and filtering
UserSchema.index({ role: 1, 'location.city': 1 });
UserSchema.index({ role: 1, availability: 1 });
UserSchema.index({ role: 1, experience: -1 });
UserSchema.index({ role: 1, rating: -1 });

// Encrypt password using bcryptjs (modern Mongoose async pre hook without next callback)
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match entered password to hashed password in database
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
