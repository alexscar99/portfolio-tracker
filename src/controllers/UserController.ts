import { Request, Response, NextFunction, Router } from 'express';
import { Model, Document } from 'mongoose';

import { ControllerBase } from '../interfaces/ControllerBase';

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

    this.router.route('/').get(this.allUsers);
    this.router.route('/:id').get(this.getUser);
    this.router.route('/portfolio/:id').post(this.getUserWithPortfolioData);
  }

  // get all documents from the users collection
  private allUsers = async (req: Request, res: Response): Promise<Response<any>> => {
    try {
      const users = await this.model.find();

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };

  // retrieve specific user by ID
  private getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any>> => {
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
        error: err.message,
      });
    }
  };

  // retrieve a user with all portfolio data (not just _id field)
  private getUserWithPortfolioData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any>> => {
    try {
      const { id } = req.params;
      const user = await this.model.findById(id).populate('portfolios');

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
        error: err.message,
      });
    }
  };
}
