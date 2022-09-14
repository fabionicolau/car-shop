import { Router, Request, Response, NextFunction } from 'express';
import carController from '../factory';

const route = Router();

route.post('/cars', async (req: Request, res: Response, next: NextFunction) => 
  carController.create(req, res, next));
route.get('/cars', async (req: Request, res: Response, next: NextFunction) => 
  carController.read(req, res, next));
route.get('/cars/:id', async (req: Request, res: Response, next: NextFunction) => 
  carController.readOne(req, res, next));
route.put('/cars/:id', async (req: Request, res: Response, next: NextFunction) =>
  carController.update(req, res, next));

export default route;