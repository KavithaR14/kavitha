const TeacherAssignment = require('../models/TeacherAssignment');
const StudentAssignment = require('../models/StudentAssignment');

// Get all assignments
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await TeacherAssignment.find().populate('teacher', 'username');
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments' });
  }
};

// Submit assignment notes
const submitAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  const { notes } = req.body;

  try {
    const existing = await StudentAssignment.findOne({
      student: req.user._id,
      assignment: assignmentId
    });

    if (existing) {
      return res.status(400).json({ message: 'Already submitted this assignment' });
    }

    const submission = new StudentAssignment({
      student: req.user._id,
      assignment: assignmentId,
      notes
    });

    const saved = await submission.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Submission failed' });
  }
};

// Get student's own submissions
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await StudentAssignment.find({ student: req.user._id })
      .populate('assignment')
      .populate('student', 'username');
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions' });
  }
};

module.exports = { getAllAssignments, submitAssignment, getMySubmissions };
