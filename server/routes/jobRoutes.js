const express = require('express');
const router = express.Router();
const {
  getJobs,
  getMyJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.route('/')
  .get(getJobs)
  .post(protect, authorize('owner'), createJob);

router.get('/my', protect, authorize('owner'), getMyJobs);

router.route('/:id')
  .get(getJobById)
  .put(protect, authorize('owner'), updateJob)
  .delete(protect, authorize('owner'), deleteJob);

module.exports = router;
