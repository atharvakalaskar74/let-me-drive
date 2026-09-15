const Car = require('../models/Car');

// @desc    Get all cars belonging to the logged-in owner
// @route   GET /api/cars
// @access  Private (Owner only)
exports.getCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ ownerId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: cars.length,
      cars
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single car by ID
// @route   GET /api/cars/:id
// @access  Private
exports.getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    // Drivers can view car details for a job/booking, but owners can only view their own
    if (req.user.role === 'owner' && car.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this car' });
    }

    res.status(200).json({ success: true, car });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new car
// @route   POST /api/cars
// @access  Private (Owner only)
exports.createCar = async (req, res, next) => {
  try {
    const {
      brand,
      model,
      variant,
      year,
      registrationNumber,
      fuelType,
      transmission,
      seatingCapacity,
      carImage
    } = req.body;

    if (!brand || !model || !year || !registrationNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide brand, model, year, and registration number'
      });
    }

    const car = await Car.create({
      ownerId: req.user.id,
      brand: brand.trim(),
      model: model.trim(),
      variant: variant ? variant.trim() : '',
      year: Number(year),
      registrationNumber: registrationNumber.trim().toUpperCase(),
      fuelType: fuelType || 'Petrol',
      transmission: transmission || 'Manual',
      seatingCapacity: seatingCapacity ? Number(seatingCapacity) : 5,
      carImage: carImage || ''
    });

    res.status(201).json({
      success: true,
      message: 'Car registered successfully!',
      car
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update car details
// @route   PUT /api/cars/:id
// @access  Private (Owner only)
exports.updateCar = async (req, res, next) => {
  try {
    let car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    if (car.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You can only update your own car' });
    }

    const fieldsToUpdate = [
      'brand',
      'model',
      'variant',
      'year',
      'registrationNumber',
      'fuelType',
      'transmission',
      'seatingCapacity',
      'carImage'
    ];

    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'registrationNumber') {
          car[field] = req.body[field].trim().toUpperCase();
        } else {
          car[field] = req.body[field];
        }
      }
    });

    await car.save();

    res.status(200).json({
      success: true,
      message: 'Car updated successfully!',
      car
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete car
// @route   DELETE /api/cars/:id
// @access  Private (Owner only)
exports.deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    if (car.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You can only delete your own car' });
    }

    await car.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Car removed successfully'
    });
  } catch (error) {
    next(error);
  }
};
