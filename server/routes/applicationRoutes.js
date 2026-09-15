const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  acceptApplication,
  rejectApplication
} = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.use(protect);

router.post('/', authorize('driver'), applyForJob);
router.get('/my', authorize('driver'), getMyApplications);
router.get('/job/:jobId', authorize('owner'), getJobApplications);
router.put('/:id/accept', authorize('owner'), acceptApplication);
router.put('/:id/reject', authorize('owner'), rejectApplication);

module.exports = router;
