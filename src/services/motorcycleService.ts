import { IModel } from '../interfaces/IModel';
import { IMotorcycleZodSchema, IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycleModel: IModel<IMotorcycle>;
  constructor(model: IModel<IMotorcycle>) {
    this._motorcycleModel = model;
  }

  async create(data: IMotorcycle): Promise<IMotorcycle> {
    const parsed = IMotorcycleZodSchema.safeParse(data);
 
    if (!parsed.success) throw parsed.error;

    return this._motorcycleModel.create(parsed.data);
  }

  async read(): Promise<IMotorcycle[]> {
    return this._motorcycleModel.read();
  }
}

export default MotorcycleService;