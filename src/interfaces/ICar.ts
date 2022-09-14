import { z } from 'zod';
import { IVehicleZodSchema } from './IVehicle';

export const ICarZodSchema = IVehicleZodSchema.extend({
  seatsQty: z.number().int().min(2).max(7),
  doorsQty: z.number().int().min(2).max(4),
});

export type ICar = z.infer<typeof ICarZodSchema>;
