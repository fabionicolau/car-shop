import { expect } from 'chai';
import sinon from 'sinon';
import  { ZodError } from 'zod';
import CarService from '../../../services/carService';
import CarModel from '../../../models/carModel';
import {
  carMockRequestObject,
  carMockResponseArray,
  carMockResponseObject,
} from '../../mocks/carMocks';
import { ErrorTypes } from '../../../helpers/errorCatalog';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockResponseObject);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockResponseObject)
			.onCall(1).resolves(null)
      .onCall(2).resolves(carMockResponseObject)
      .onCall(3).resolves(null);
		sinon.stub(carModel, 'update').resolves(carMockResponseObject)
	});

	after(() => {
		sinon.restore()
	});

	describe('Create car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMockRequestObject);

			expect(carCreated).to.be.deep.equal(carMockResponseObject);
		});

		it('Failure', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('ReadOne car', () => {
		it('Success', async () => {
			const carById = await carService.readOne('63224d578e4ecfc6215dbf54');

			expect(carById).to.be.deep.equal(carMockResponseObject);
		});

		it('Failure', async () => {
			try {
				await carService.readOne('63224d578e4ecfc6215dbf54');
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.NotFound);
			}
		});
	});

	describe('Update car', () => {
		it('Success', async () => {
			const carUpdated = await carService.update('63224d578e4ecfc6215dbf54', carMockRequestObject);
			expect(carUpdated).to.be.deep.equal(carMockResponseObject);
		});

    it('Failure', async () => {
			try {
				await carService.update('63224d578e4ecfc6215dbf54', carMockRequestObject);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.NotFound);
			}
		});
	});

});