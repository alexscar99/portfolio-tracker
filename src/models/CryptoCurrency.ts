import mongoose from 'mongoose';

export interface CryptoCurrencyModel extends mongoose.Document {
  name: string;
  price: number;
  amount: number;
  ticker: string;
}

const CryptoCurrencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
});

export const CryptoCurrency = mongoose.model<CryptoCurrencyModel>(
  'CryptoCurrency',
  CryptoCurrencySchema
);
