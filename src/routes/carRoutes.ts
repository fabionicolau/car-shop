import { Router, Request, Response, NextFunction } from 'express';
import { carController } from '../factory';

const route = Router();

const CAR_PATH = '/cars';
const CAR_ID_PATH = '/cars/:id';

route.post(CAR_PATH, async (req: Request, res: Response, next: NextFunction) => 
  carController.create(req, res, next));
route.get(CAR_PATH, async (req: Request, res: Response, next: NextFunction) => 
  carController.read(req, res, next));
route.get(CAR_ID_PATH, async (req: Request, res: Response, next: NextFunction) => 
  carController.readOne(req, res, next));
route.put(CAR_ID_PATH, async (req: Request, res: Response, next: NextFunction) =>
  carController.update(req, res, next));
route.delete(CAR_ID_PATH, async (req: Request, res: Response, next: NextFunction) =>
  carController.delete(req, res, next));

export default route;