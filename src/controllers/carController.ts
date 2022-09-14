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

  async read(req: Request, res: Response<ICar[]>, next: NextFunction): Promise<void> {
    try {
      const AllCars = await this._service.read();
      res.status(200).json(AllCars);
    } catch (error) {
      errorHandler(error as Error | ZodError, req, res, next);
    }
  }

  async readOne(req: Request, res: Response<ICar>, next: NextFunction): Promise<void> {
    try {
      const car = await this._service.readOne(req.params.id);
      res.status(200).json(car as ICar);
    } catch (error) {
      errorHandler(error as Error | ZodError, req, res, next);
    }
  }

  async update(req: Request, res: Response<ICar>, next: NextFunction): Promise<void> {
    try {
      const updatedCar = await this._service.update(req.params.id, req.body);
      res.status(200).json(updatedCar as ICar);
    } catch (error) {
      errorHandler(error as Error | ZodError, req, res, next);
    }
  }

  async delete(req: Request, res: Response<ICar>, next: NextFunction): Promise<void> {
    try {
      await this._service.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      errorHandler(error as Error | ZodError, req, res, next);
    }
  }
}

export default CarController;