import { Request, Response, NextFunction, Router } from 'express';
import { Model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { ControllerBase } from '../interfaces/ControllerBase';

export class AuthController implements ControllerBase {
  model: Model<Document, {}>;
  router: Router;
  route: string;

  constructor(model: Model<Document>, route: string) {
    this.model = model;
    this.route = route;
    this.initRoutes();
  }

  // initialize router and assign methods to routes with HTTP methods
  initRoutes(): void {
    this.router = Router();

    this.router.route('/register').post(this.registerUser);

    this.router.route('/login').post(this.loginUser);
  }

  // method to register a new user to users collection
  private registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any>> => {
    try {
      const { email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      // create new User model
      const user = await this.model.create({
        email,
        password: hashedPassword,
      });

      // create token for new user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });

      return res.status(201).json({
        success: true,
        auth: true,
        token,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };

  // method to log in a user
  private loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any>> => {
    try {
      const { email, password } = req.body;

      // search MongoDB collection for email
      const user = await this.model.findOne({ email }, 'password');

      // convert to JSON to pull properties off of Document
      const userJSON = user.toJSON();

      if (user) {
        // compare hashed password with client entered password
        const result = await bcrypt.compare(password, userJSON.password);

        if (result) {
          // create token if passwords match and send with JSON success
          const token = jwt.sign({ id: userJSON._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: 3600,
          });

          res.status(200).json({
            success: true,
            auth: true,
            token,
          });
        } else {
          res.status(401).json({
            success: false,
            auth: false,
            token: null,
            error: 'Username or password is incorrect',
          });
        }
      } else {
        res.status(401).json({
          success: false,
          auth: false,
          token: null,
          error: 'User not found',
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };
}
