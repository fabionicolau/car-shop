import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';
import errorHandler from '../middlewares/errorHandler';

class CarController {
  private _service: IService<ICar>;
  constructor(service: IService<ICar>) {
    this._service = service;
  }

  async create(req: Request, res: Response<ICar>, next: NextFunction): Promise<void> {
    try {
      const newCar = await this._service.create(req.body);
      res.status(201).json(newCar);
    } catch (error) {
      errorHandler(error as Error | ZodError, req, res, next);
    }
  }
}

export default CarController;