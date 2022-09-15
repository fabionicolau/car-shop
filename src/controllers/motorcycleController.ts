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

  async read(req: Request, res: Response<IMotorcycle[]>, next: NextFunction): Promise<void> {
    try {
      const motorcycles = await this._service.read();
      res.status(200).json(motorcycles);
    } catch (error) {
      errorHandler(error as Error | ZodError, req, res, next);
    }
  }

  async readOne(req: Request, res: Response<IMotorcycle>, next: NextFunction): Promise<void> {
    try {
      const motorcycle = await this._service.readOne(req.params.id);
      res.status(200).json(motorcycle as IMotorcycle);
    } catch (error) {
      errorHandler(error as Error | ZodError, req, res, next);
    }
  }

  async update(req: Request, res: Response<IMotorcycle>, next: NextFunction): Promise<void> {
    try {
      const updatedMotorcycle = await this._service.update(req.params.id, req.body);
      res.status(200).json(updatedMotorcycle as IMotorcycle);
    } catch (error) {
      errorHandler(error as Error | ZodError, req, res, next);
    }
  }

  async delete(req: Request, res: Response<IMotorcycle>, next: NextFunction): Promise<void> {
    try {
      await this._service.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      errorHandler(error as Error | ZodError, req, res, next);
    }
  }
}

export default MotorcycleController;