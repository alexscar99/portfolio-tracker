import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
}

export const UserSchema = new mongoose.Schema({
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

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
