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
}

export default CarService;