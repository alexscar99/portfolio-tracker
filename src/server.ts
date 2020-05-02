import express from 'express';
import * as dotenv from 'dotenv';

import { connectDB } from '../config/db';
import { allUsers, addUser } from './controllers/userController';
import users from './routes/users';

dotenv.config({
  path: './config/config.env',
});

// connect to MongoDB
connectDB();

const app = express();

// body parser
app.use(express.json());

app.use('/api/v1/users', users);

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

// start express server
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
