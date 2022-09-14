import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/carModel';
import { Model } from 'mongoose';
import {
  carMockRequestObject,
  carMockResponseArray,
  carMockResponseObject,
} from '../../mocks/carMocks';
import { ErrorTypes } from '../../../helpers/errorCatalog';

describe('Car Model', () => {
	const carModel = new CarModel();
  
	before(() => {
		sinon.stub(Model, 'create').resolves(carMockResponseObject);
    sinon.stub(Model, 'find').resolves(carMockResponseArray);
		sinon.stub(Model, 'findOne').resolves(carMockResponseObject);
		sinon.stub(Model, 'findOneAndUpdate').resolves(carMockResponseObject);
    sinon.stub(Model, 'findOneAndDelete').resolves(carMockResponseObject);
	});

	after(() => {
		sinon.restore();
	})

	describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(carMockRequestObject);
			expect(newCar).to.be.deep.equal(carMockResponseObject);
		});
	});

	describe('searching all cars', () => {
		it('successfully found', async () => {
			const allCars = await carModel.read();
			expect(allCars).to.be.deep.equal(carMockResponseArray);
		});
  });

  describe('searching a car by _id', () => {
		it('successfully found', async () => {
			const carById = await carModel.readOne('63224d578e4ecfc6215dbf54');
			expect(carById).to.be.deep.equal(carMockResponseObject);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('idErrado');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
	
	describe('changing a car', () => {
		it('successfully changed', async () => {
			const carChanged = await carModel.update('63224d578e4ecfc6215dbf54', carMockRequestObject);
			expect(carChanged).to.be.deep.equal(carMockResponseObject);
		});
    
	
		it('_id not found to change', async () => {
			try {
				await carModel.update('63224d578e4ecfc6215dbf54', carMockRequestObject);
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('deleting a car', () => {
		it('successfully changed', async () => {
			const deletedCar = await carModel.delete('63224d578e4ecfc6215dbf54');
      
			expect(deletedCar).to.be.deep.equal(carMockResponseObject);
		});
    
	
		it('_id not found to change', async () => {
			try {
				await carModel.delete('63224d578e4ecfc6215dbf54');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
	
});