const express = require('express');
const router = express.Router();
const {
  getAllAssignments,
  submitAssignment,
  getMySubmissions
} = require('../controllers/studentAssignmentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/assignments', protect, getAllAssignments);
router.post('/submit/:assignmentId', protect, submitAssignment);
router.get('/mysubmissions', protect, getMySubmissions);

module.exports = router;
