const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');  // ✅ Make sure the path is correct

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => seedDatabase())
  .catch(err => console.error('DB connection error', err));

async function seedDatabase() {
  try {
    // ✅ Delete existing Admin data
    await Admin.deleteMany({});

    const hashedPassword = await bcrypt.hash('admin123', 10);

    // ✅ Create admin user
    await Admin.create({
      username: 'admin',
      password: hashedPassword,
    });

    console.log('✅ Admin seeding successful');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    mongoose.disconnect();
  }
}
