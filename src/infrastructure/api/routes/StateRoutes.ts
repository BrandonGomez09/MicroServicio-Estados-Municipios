import { Router } from 'express';
import { StateController } from '@infrastructure/api/controllers/StateController';


export const createStateRoutes = (controller: StateController): Router => {
  const router = Router();

  router.get('/states', controller.getAll.bind(controller));
  router.get('/states/:id', controller.getById.bind(controller));
  router.get('/states/:id/municipalities', controller.getMunicipalitiesByState.bind(controller));

  return router;
};
