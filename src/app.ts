import "reflect-metadata"; // ¡Importante! Debe ir primero
import express, { Application } from 'express';

// Importamos nuestras rutas y el controlador ya ensamblado
import { createStateRoutes } from '@infrastructure/api/routes/StateRoutes';
import { stateController } from '@infrastructure/api/dependencies/dependencies';

export const createApp = (): Application => {
  const app: Application = express();

  // Middlewares
  app.use(express.json()); // Para entender JSON en el body

  // Rutas
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Servicio de estados funcionando' });
  });

  // Usamos el router de estados con el prefijo /api
  app.use('/api', createStateRoutes(stateController));

  return app;
};
