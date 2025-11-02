import { State } from "@domain/entities/State";
import { IStateRepository } from "@domain/repositories/IStateRepository";
import { PaginatedResponse } from "@domain/types/PaginatedResponse";

export class GetAllStatesUseCase {
  
  constructor(private readonly stateRepository: IStateRepository) {}

  async execute(options: { page: number; limit: number }): Promise<PaginatedResponse<State>> {
    const page = options.page < 1 ? 1 : options.page;
    const limit = options.limit < 1 ? 10 : options.limit;
    return this.stateRepository.findPaginated({ page, limit });
  }
}
