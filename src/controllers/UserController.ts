import { Request, Response, NextFunction, Router } from 'express';
import { Model, Document } from 'mongoose';

import { ControllerBase } from '../interfaces/ControllerBase';
import { APIResponse } from '../interfaces/APIResponse';

export class UserController implements ControllerBase {
  model: Model<Document>;
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

    this.router.route('/').get(this.allUsers).post(this.addUser);

    this.router.route('/:id').get(this.getUser);
  }

  // method to get all documents from the users collection
  allUsers = async (req: Request, res: Response): Promise<Response<APIResponse>> => {
    try {
      const users = await this.model.find();

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  };

  // method to add document to users collection
  addUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<APIResponse>> => {
    try {
      const { email, password } = req.body;

      const user = await this.model.create(req.body);

      return res.status(201).json({
        success: true,
        data: user,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  };

  // method to retrieve specific document by ID from users collection
  getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<APIResponse>> => {
    try {
      const user = await this.model.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'No user found',
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  };
}
