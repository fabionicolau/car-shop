import { ErrorTypes } from '../helpers/errorCatalog';
import { ICar, ICarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class CarService implements IService<ICar> {
  private _carModel: IModel<ICar>;
  constructor(model: IModel<ICar>) {
    this._carModel = model;
  }

  async create(data: ICar): Promise<ICar> {
    const parsed = ICarZodSchema.safeParse(data);
 
    if (!parsed.success) throw parsed.error;
 
    return this._carModel.create(parsed.data);
  }

  async read(): Promise<ICar[]> {
    return this._carModel.read();
  }

  async readOne(_id: string): Promise<ICar | null> {
    const car = await this._carModel.readOne(_id);

    if (!car) {
      throw Error(ErrorTypes.NotFound);
    }
    
    return car;
  }

  async update(_id: string, data: ICar): Promise<ICar | null> {
    const parsed = ICarZodSchema.safeParse(data);
    if (!parsed.success) throw parsed.error;
    await this.readOne(_id);
 
    return this._carModel.update(_id, parsed.data);
  }

  async delete(_id: string): Promise<ICar | null> {
    await this.readOne(_id);
 
    return this._carModel.delete(_id);
  }
}

export default CarService;