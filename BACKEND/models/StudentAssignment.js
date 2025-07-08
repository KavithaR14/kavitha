const mongoose = require('mongoose');

const studentAssignmentSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  startDate: Date,
  endDate: Date,
  totalMarks: Number,
  assignmentQuestions: [
    {
      questionText: { type: String, required: true },
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'Submitted', 'Graded'],
    default: 'Pending',
  },
  submission: {
    answers: [
      {
        questionId: mongoose.Schema.Types.ObjectId,
        answerText: String,
        attachedFile: {
          fileName: String,
          filePath: String,
        },
      },
    ],
    submissionDate: Date,
    grade: String,
    feedback: String,
  },
});

module.exports = mongoose.model('StudentAssignment', studentAssignmentSchema);
