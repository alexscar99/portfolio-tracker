import { Router, Request, Response, NextFunction } from 'express';
import { Model, Document } from 'mongoose';

import { ControllerBase } from '../interfaces/ControllerBase';
import { User } from '../models/User';
import { authenticateToken } from '../middlewares/authenticateToken';

export class PortfolioController implements ControllerBase {
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

    this.router.use(authenticateToken);

    this.router.route('/').get(this.allPortfolios);
    this.router.route('/:id').get(this.getPortfolio);
    this.router.route('/create/:id').post(this.createPortfolio);
  }

  // get all documents from the portfolios collection
  private allPortfolios = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any>> => {
    try {
      const portfolios = await this.model.find();

      return res.status(200).json({
        success: true,
        data: portfolios,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };

  // retrieve specific portfolio by ID
  private getPortfolio = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any>> => {
    try {
      const portfolio = await this.model.findById(req.params.id);

      if (!portfolio) {
        return res.status(404).json({
          success: false,
          error: 'No portfolio found',
        });
      }

      return res.status(200).json({
        success: true,
        data: portfolio,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };

  // create portfolio as well as update User document with portfolio's _id
  private createPortfolio = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, totalPrice, cryptocurrencies } = req.body;

      // create new portfolio
      const portfolio = await this.model.create({
        _user: id,
        name,
        totalPrice,
        cryptocurrencies,
      });

      await portfolio.save();

      // update User document with portfolio _id field
      await User.findByIdAndUpdate(id, { $push: { portfolios: portfolio._id } }, { new: true });

      return res.status(201).json({
        success: true,
        data: portfolio,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };
}
