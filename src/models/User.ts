import mongoose from 'mongoose';

interface UserModel extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter valid password'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model<UserModel>('User', UserSchema);
