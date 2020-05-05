import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { config } from 'dotenv';
import { connectDB } from '../config/db';

import { App } from './App';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/AuthController';
import { User } from './models/User';

// set up dotenv
config({ path: './config/config.env' });

// connect to MongoDB
connectDB();

// initialize App
const app = new App({
  port: parseInt(process.env.PORT as string, 10),
  middlewares: [express.json(), cors(), helmet()],
  controllers: [new UserController(User, '/api/users'), new AuthController(User, '/api/auth')],
});

// start server
app.listen();
