import { State } from "@domain/entities/State";
import { PaginatedResponse } from "@domain/types/PaginatedResponse";

export interface IStateRepository {
  findPaginated(options: { page: number; limit: number }): Promise<PaginatedResponse<State>>;
  findById(id: number): Promise<State | null>;
}
