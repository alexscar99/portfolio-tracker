import mongoose from 'mongoose';
import { PortfolioModel } from '../models/Portfolio';

export interface UserModel extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
  portfolios: mongoose.Document[];
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter valid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter valid password'],
  },
  portfolios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model<UserModel>('User', UserSchema);
