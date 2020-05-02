import express from 'express';
import cors from 'cors';

import { config } from 'dotenv';
import { connectDB } from '../config/db';

import { App } from './App';
import { UserController } from './controllers/UserController';
import { User } from './models/User';

// set up dotenv
config({ path: './config/config.env' });

// connect to MongoDB
connectDB();

// initialize App
const app = new App({
  port: parseInt(process.env.PORT as string, 10),
  middlewares: [express.json(), cors()],
  controllers: [new UserController(User, '/api/v1/users')],
});

// start server
app.listen();
