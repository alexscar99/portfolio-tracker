import { Router, Request, Response, NextFunction } from 'express';
import { Model, Document } from 'mongoose';

import { ControllerBase } from '../interfaces/ControllerBase';
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

    this.router.route('/').get(this.getPortfolios);
    this.router.route('/create').post(this.addPortfolio);
  }

  getPortfolios = async (
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

  addPortfolio = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, totalPrice, cryptocurrencies } = req.body;

      // create new portfolio
      const portfolio = await this.model.create({
        name,
        totalPrice,
        cryptocurrencies,
      });

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
