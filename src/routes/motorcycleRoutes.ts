import { Router, Request, Response, NextFunction } from 'express';
import { motorcycleController } from '../factory';

const route = Router();

route.post('/motorcycles', async (req: Request, res: Response, next: NextFunction) => 
  motorcycleController.create(req, res, next));
route.get('/motorcycles', async (req: Request, res: Response, next: NextFunction) => 
  motorcycleController.read(req, res, next));
route.get('/motorcycles/:id', async (req: Request, res: Response, next: NextFunction) => 
  motorcycleController.readOne(req, res, next));
route.put('/motorcycles/:id', async (req: Request, res: Response, next: NextFunction) => 
  motorcycleController.update(req, res, next));

export default route;