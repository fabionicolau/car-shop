import Car from '../models/carModel';
import CarService from '../services/carService';
import CarController from '../controllers/carController';

const carModel = new Car();
const carService = new CarService(carModel);
const carController = new CarController(carService);

export default carController;