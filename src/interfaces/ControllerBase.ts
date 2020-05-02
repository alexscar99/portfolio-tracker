import { Router } from 'express';
import { Model, Document } from 'mongoose';

export interface ControllerBase {
  model: Model<Document>;
  router: Router;
  initRoutes(): void;
}
