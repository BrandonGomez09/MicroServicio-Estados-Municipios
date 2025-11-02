// Importaciones de Implementaciones (El "CÓMO")
import { TypeORMStateRepository } from '@infrastructure/database/repositories/TypeORMStateRepository';
import { TypeORMMunicipalityRepository } from '@infrastructure/database/repositories/TypeORMMunicipalityRepository';

// Importaciones de Casos de Uso (El "QUÉ")
import { GetAllStatesUseCase } from '@application/use-cases/GetAllStatesUseCase';
import { GetStateByIdUseCase } from '@application/use-cases/GetStateByIdUseCase';
import { GetMunicipalitiesByStateUseCase } from '@application/use-cases/GetMunicipalitiesByStateUseCase';

// Importación del Controlador
import { StateController } from '@infrastructure/api/controllers/StateController';

// --- Aquí ocurre la magia de la Inyección de Dependencias ---

// 1. Creamos las instancias de los repositorios (las implementaciones reales)
const stateRepository = new TypeORMStateRepository();
const municipalityRepository = new TypeORMMunicipalityRepository();

// 2. Creamos las instancias de los Casos de Uso, inyectando los repositorios
const getAllStatesUseCase = new GetAllStatesUseCase(stateRepository);
const getStateByIdUseCase = new GetStateByIdUseCase(stateRepository);
const getMunicipalitiesByStateUseCase = new GetMunicipalitiesByStateUseCase(municipalityRepository);

// 3. Creamos la instancia del Controlador, inyectando los casos de uso
export const stateController = new StateController(
  getAllStatesUseCase,
  getStateByIdUseCase,
  getMunicipalitiesByStateUseCase
);
