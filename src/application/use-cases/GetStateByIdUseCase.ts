import { State } from "@domain/entities/State";
import { IStateRepository } from "@domain/repositories/IStateRepository";

export class GetStateByIdUseCase {

  constructor(private readonly stateRepository: IStateRepository) {}

  async execute(id: number): Promise<State | null> {
    
    if (!id || id < 1) {
      throw new Error("ID de estado inválido");
    }
    const state = await this.stateRepository.findById(id);
    return state;
  }
}