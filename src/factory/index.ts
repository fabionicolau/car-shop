import CarModel from '../models/carModel';
import CarService from '../services/carService';
import CarController from '../controllers/carController';
import MotorcycleModel from '../models/motorcycleModel';
import MotorcycleService from '../services/motorcycleService';
import MotorcycleController from '../controllers/motorcycleController';

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

export { carController, motorcycleController };