import { Express } from 'express';
import ordersRoutes from './routes/ordersRoutes';
import summaryRoutes from './routes/summaryRoutes';
import productsRoutes from './routes/productsRoutes';
import userRoutes from './routes/userRoutes';

export const initRoutes = (app: Express) => {
  app.use('/api/v1', ordersRoutes);
  app.use('/api/v1', summaryRoutes);
  app.use('/api/v1', productsRoutes);
  app.use('/api/v1', userRoutes);
};
