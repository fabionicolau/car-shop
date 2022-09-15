import { Router, Request, Response, NextFunction } from 'express';
import { motorcycleController } from '../factory';

const route = Router();

const MOTORCYCLE_PATH = '/motorcycles';
const MOTORCYCLE_ID_PATH = '/motorcycles/:id';

route.post(MOTORCYCLE_PATH, async (req: Request, res: Response, next: NextFunction) => 
  motorcycleController.create(req, res, next));
route.get(MOTORCYCLE_PATH, async (req: Request, res: Response, next: NextFunction) => 
  motorcycleController.read(req, res, next));
route.get(MOTORCYCLE_ID_PATH, async (req: Request, res: Response, next: NextFunction) => 
  motorcycleController.readOne(req, res, next));
route.put(MOTORCYCLE_ID_PATH, async (req: Request, res: Response, next: NextFunction) => 
  motorcycleController.update(req, res, next));
route.delete(MOTORCYCLE_ID_PATH, async (req: Request, res: Response, next: NextFunction) => 
  motorcycleController.delete(req, res, next));

export default route;