const express = require('express');
const router = express.Router();
const {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} = require('../controllers/carController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.use(protect);

router.route('/')
  .get(authorize('owner'), getCars)
  .post(authorize('owner'), createCar);

router.route('/:id')
  .get(getCarById)
  .put(authorize('owner'), updateCar)
  .delete(authorize('owner'), deleteCar);

module.exports = router;
