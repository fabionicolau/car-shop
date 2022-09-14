import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import {
  carMockRequestObject,
  carMockResponseArray,
  carMockResponseObject,
} from '../../mocks/carMocks';
import CarModel from '../../../models/carModel';
import CarService from '../../../services/carService';
import CarController from '../../../controllers/carController';


describe('Car Controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  
  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMockResponseObject);
    sinon.stub(carService, 'read').resolves(carMockResponseArray);
    sinon.stub(carService, 'readOne').resolves(carMockResponseObject);
    sinon.stub(carService, 'update').resolves(carMockResponseObject);
    sinon.stub(carService, 'delete').resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create Car', () => {
    it('Success', async () => {
      req.body = carMockResponseObject;
      await carController.create(req, res, next);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockResponseObject)).to.be.true;
    });
  });

  describe('Read Car', () => {
    it('Success', async () => {
      await carController.read(req, res, next);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockResponseArray)).to.be.true;
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      req.params = { id: '63224d578e4ecfc6215dbf54' };
      await carController.readOne(req, res, next);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockResponseObject)).to.be.true;
    });
  });

  describe('Update Car', () => {
    it('Success', async () => {
      req.params = { id: '63224d578e4ecfc6215dbf54' };
      req.body = carMockRequestObject 
      await carController.update(req, res, next);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockResponseObject)).to.be.true;
    });
  });

  describe('Delete Car', () => {
    it('Success', async () => {
      req.params = { id: '63224d578e4ecfc6215dbf54' };
      await carController.delete(req, res, next);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  });

});