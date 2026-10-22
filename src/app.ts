
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import apiRoutes from './routes';
import { requestLogger } from './middlewares/logger.middleware';
import { globalErrorHandler } from './middlewares/errorHandler.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'ControlLabs API operando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.get('/__test/error', (_req, _res, next) => {
  next(new Error('Error de prueba'));
});


app.use('/api/v1', apiRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada.'
  });
});

app.use(globalErrorHandler);

export default app;
