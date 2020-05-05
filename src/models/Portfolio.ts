import mongoose from 'mongoose';
import { CryptoCurrencyModel } from './CryptoCurrency';

interface PortfolioModel extends mongoose.Document {
  name: string;
  totalPrice: number;
  cryptocurrencies: CryptoCurrencyModel[];
}

const PortfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
