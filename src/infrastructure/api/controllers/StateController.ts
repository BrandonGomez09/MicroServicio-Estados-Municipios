// Usaremos Request y Response de Express para tener tipado
import { Request, Response } from 'express';
import { GetAllStatesUseCase } from '@application/use-cases/GetAllStatesUseCase';
import { GetStateByIdUseCase } from '@application/use-cases/GetStateByIdUseCase';
import { GetMunicipalitiesByStateUseCase } from '@application/use-cases/GetMunicipalitiesByStateUseCase';

export class StateController {
  
  // Inyectamos todos los casos de uso que este controlador necesita
  constructor(
    private readonly getAllStatesUseCase: GetAllStatesUseCase,
    private readonly getStateByIdUseCase: GetStateByIdUseCase,
    private readonly getMunicipalitiesByStateUseCase: GetMunicipalitiesByStateUseCase
  ) {}

  /**
   * Maneja GET /api/states
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      // 1. Obtenemos page y limit desde los query params de la URL
      // Usamos 'as any' temporalmente o definimos un tipo, pero así es más rápido
      const page = parseInt(req.query.page as string || '1');
      const limit = parseInt(req.query.limit as string || '10');

      // 2. Ejecutamos el caso de uso
      const result = await this.getAllStatesUseCase.execute({ page, limit });

      // 3. Devolvemos el resultado
      res.status(200).json(result);

    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor', error: (error as Error).message });
    }
  }

  /**
   * Maneja GET /api/states/:id
   */
  async getById(req: Request, res: Response): Promise<void> {
    try {
      // 1. Obtenemos el ID desde los parámetros de la ruta
      const id = parseInt(req.params.id);

      // 2. Ejecutamos el caso de uso
      const state = await this.getStateByIdUseCase.execute(id);

      // 3. Manejamos el caso "No encontrado"
      if (!state) {
        res.status(404).json({ message: 'Estado no encontrado' });
        return;
      }

      // 4. Devolvemos el estado
      res.status(200).json(state);

    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor', error: (error as Error).message });
    }
  }

  async getMunicipalitiesByState(req: Request, res: Response): Promise<void> {
    try {
      const stateId = parseInt(req.params.id);

      const page = parseInt(req.query.page as string || '1');
      const limit = parseInt(req.query.limit as string || '10');

      const result = await this.getMunicipalitiesByStateUseCase.execute({ stateId, page, limit });

      res.status(200).json(result);

    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor', error: (error as Error).message });
    }
  }
}
