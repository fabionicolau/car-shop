import CarModel from '../models/carModel';
import CarService from '../services/carService';
import CarController from '../controllers/carController';

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

export default carController;