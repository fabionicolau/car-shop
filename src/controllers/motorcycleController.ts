import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';
import errorHandler from '../middlewares/errorHandler';

class MotorcycleController {
  private _service: IService<IMotorcycle>;  

  constructor(service: IService<IMotorcycle>) {
    this._service = service;
  }
  async create(req: Request, res: Response<IMotorcycle>, next: NextFunction): Promise<void> {
    try {
      const newMotorcycle = await this._service.create(req.body);
      res.status(201).json(newMotorcycle);
    } catch (error) {
      errorHandler(error as Error | ZodError, req, res, next);
    }
  }
}

export default MotorcycleController;