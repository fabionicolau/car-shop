import { ErrorTypes } from '../helpers/errorCatalog';
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

  async readOne(_id: string): Promise<IMotorcycle | null> {
    const motorcycle = await this._motorcycleModel.readOne(_id);

    if (!motorcycle) {
      throw Error(ErrorTypes.NotFound);
    }
    return motorcycle;
  }

  async update(_id: string, data: IMotorcycle): Promise<IMotorcycle | null> {
    const parsed = IMotorcycleZodSchema.safeParse(data);
    if (!parsed.success) throw parsed.error;

    await this.readOne(_id);

    return this._motorcycleModel.update(_id, parsed.data);
  }

  async delete(_id: string): Promise<IMotorcycle | null> {
    await this.readOne(_id);

    return this._motorcycleModel.delete(_id);
  }
}

export default MotorcycleService;