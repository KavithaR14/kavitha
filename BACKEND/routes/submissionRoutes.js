const express = require('express');
const router = express.Router();
const { submitAssignment, uploadFile } = require('../controllers/submissionController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup file upload directory
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Assignment submission and file upload
router.post('/assignments/:id/submissions', protect, submitAssignment);
router.post('/submissions/upload', protect, upload.single('file'), uploadFile);

module.exports = router;
