const Submission = require('../models/Submission');
const TeacherAssignment = require('../models/TeacherAssignment');
const asyncHandler = require('express-async-handler');

// const Submission = require('../models/Submission');
// const TeacherAssignment = require('../models/TeacherAssignment');
const Student = require('../models/Students'); // Add this import
// const asyncHandler = require('express-async-handler');

exports.submitAssignment = asyncHandler(async (req, res) => {
  const studentId = req.user?._id;
  const assignmentId = req.params.id;
  const { answers, submissionDate } = req.body;

  if (!studentId || !assignmentId) {
    return res.status(400).json({
      success: false,
      message: 'Missing studentId or assignmentId',
      studentId: studentId || 'undefined',
      assignmentId: assignmentId || 'undefined'
    });
  }

  const assignment = await TeacherAssignment.findById(assignmentId);
  if (!assignment) {
    res.status(404);
    throw new Error('Assignment not found');
  }

  const student = await Student.findById(studentId);
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const existing = await Submission.findOne({ assignmentId, studentId });
  if (existing) {
    return res.status(400).json({ message: 'Already submitted' });
  }

  const newSubmission = new Submission({
    assignmentId,
    studentId,
    answers,
    submissionDate,
  });

  await newSubmission.save();

  // 🧾 Log or use student details and assignment info
  console.log('Submitted by:', student.name);
  console.log('Class:', assignment.class);
  console.log('Section:', assignment.section);

  res.status(201).json({
    message: 'Assignment submitted successfully',
    submittedBy: {
      name: student.name,
      class: assignment.class,
      section: assignment.section
    }
  });
});



// Upload file
exports.uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const filePath = req.file.path.replace(/\\/g, '/');
  res.status(200).json({
    fileName: req.file.filename,
    filePath: filePath,
    fileUrl: `http://localhost:5000/${filePath}`,
  });
});

