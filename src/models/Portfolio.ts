import mongoose from 'mongoose';
import { UserModel } from './User';
import { CryptoCurrencyModel } from './CryptoCurrency';

export interface PortfolioModel extends mongoose.Document {
  _user: UserModel;
  name: string;
  totalPrice: number;
  cryptocurrencies: CryptoCurrencyModel[] | [];
}

const PortfolioSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  cryptocurrencies: {
    type: Array,
  },
});

export const Portfolio = mongoose.model<PortfolioModel>('Portfolio', PortfolioSchema);
