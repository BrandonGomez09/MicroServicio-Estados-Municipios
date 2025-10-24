require('dotenv').config();
const express = require('express');


// Repositorios (Infraestructura)
const PostgresStateRepository = require('./infrastructure/database/repositories/PostgresStateRepository');
const PostgresMunicipalityRepository = require('./infrastructure/database/repositories/PostgresMunicipalityRepository'); // NUEVO

// Casos de Uso (Aplicación)
const GetAllStatesUseCase = require('./application/use-cases/GetAllStatesUseCase');
const GetMunicipalitiesByStateUseCase = require('./application/use-cases/GetMunicipalitiesByStateUseCase'); // NUEVO

// Controlador (Infraestructura)
const StateController = require('./infrastructure/api/controllers/StateController');

// Rutas (Infraestructura)
const createStateRoutes = require('./infrastructure/api/routes/StateRoutes');


async function main() {
  const app = express();
  app.use(express.json());

  const stateRepository = new PostgresStateRepository();
  const municipalityRepository = new PostgresMunicipalityRepository();

  // Inyectamos los repositorios en los Casos de Uso
  const getAllStatesUseCase = new GetAllStatesUseCase(stateRepository);
  const getMunicipalitiesByStateUseCase = new GetMunicipalitiesByStateUseCase(municipalityRepository); 

  // Inyectamos AMBOS Casos de Uso en el Controlador
  const stateController = new StateController(
    getAllStatesUseCase,
    getMunicipalitiesByStateUseCase 
  );

  // Creamos las rutas y les inyectamos el controlador
  const stateRoutes = createStateRoutes(stateController);


  // --- 3. USAR LAS RUTAS ---
  app.use('/api', stateRoutes);

  // Ruta de prueba
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'OK',
      message: 'El servidor está funcionando correctamente'
    });
  });

  // Iniciar el servidor
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log(`Ruta de Estados disponible en: http://localhost:${port}/api/states`);
    console.log(`Ruta de Municipios disponible en: http://localhost:${port}/api/states/7/municipalities`); 
  });
}

main().catch((err) => {
  console.error('Error al iniciar el servidor:', err);
});