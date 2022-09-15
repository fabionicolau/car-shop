import { z } from 'zod';
import { IVehicleZodSchema } from './IVehicle';
 
export const IMotorcycleZodSchema = IVehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().min(1).max(2500),
});

export type IMotorcycle = z.infer<typeof IMotorcycleZodSchema>;