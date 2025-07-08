const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  answerText: String,
  attachedFile: {
    fileName: String,
    filePath: String,
  },
});

const submissionSchema = new mongoose.Schema({
assignmentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'TeacherAssignment' },
studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Students' },

  answers: [answerSchema],
  submissionDate: { type: Date, default: Date.now },
});

submissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });


module.exports = mongoose.model('Submission', submissionSchema);
