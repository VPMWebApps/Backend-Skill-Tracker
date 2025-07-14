import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin', 'superadmin'],
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{collection: "usercollection", timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;
