const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
connectDB();

// Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/teachers', require('./routes/teacherRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/teacherassignment', require('./routes/teacherAssignmentRoutes'));
app.use('/api', require('./routes/submissionRoutes'));

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
