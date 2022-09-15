import express from 'express';
import carRoutes from './routes/carRoutes';
import motorcycleRoutes from './routes/motorcycleRoutes';

const app = express();

app.use(express.json());
app.use(carRoutes);
app.use(motorcycleRoutes);

export default app;
