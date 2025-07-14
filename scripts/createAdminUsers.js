import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import adminData from '../data/adminData.json' assert { type: "json" };
import User from '../models/user.js';

dotenv.config();

const createAdminUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Create admin users
    for (const [key, admin] of Object.entries(adminData)) {
      // Check if admin already exists
      const existingAdmin = await User.findOne({ email: admin.email });
      
      if (existingAdmin) {
        console.log(`Admin ${admin.username} already exists`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(admin.password, 10);

      // Create new admin user
      const newAdmin = new User({
        email: admin.email,
        password: hashedPassword,
        username: admin.username,
        role: admin.role
      });

      await newAdmin.save();
      console.log(`Created ${admin.role} user: ${admin.username}`);
    }

    console.log('Admin users creation completed');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin users:', error);
    process.exit(1);
  }
};

createAdminUsers(); 