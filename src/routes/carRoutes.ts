import { Router, Request, Response, NextFunction } from 'express';
import carController from '../factory';

const route = Router();

route.post('/cars', async (req: Request, res: Response, next: NextFunction) => 
  carController.create(req, res, next));

export default route;