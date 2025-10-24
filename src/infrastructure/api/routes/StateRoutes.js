const { Router } = require('express');

/**
 * @param {StateController} stateController
 */
const createStateRoutes = (stateController) => {
  const router = Router();

  // Ruta para obtener todos los estados
  router.get('/states', stateController.getAll);
  router.get('/states/:id/municipalities', stateController.getMunicipalitiesByState);

  return router;
};

module.exports = createStateRoutes;