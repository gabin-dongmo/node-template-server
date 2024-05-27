import {
	type TodoEntity,
	type TodoDatasource,
	type GetTodoByIdDto,
	type UpdateTodoDto,
	type CreateTodoDto,
	type TodoRepository
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../common';

export class TodoRepositoryImpl implements TodoRepository {
	constructor(private readonly datasource: TodoDatasource) {}

	async create(createDto: CreateTodoDto): Promise<TodoEntity> {
		return await this.datasource.create(createDto);
	}

	async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TodoEntity[]>> {
		return await this.datasource.getAll(pagination);
	}

	async getById(getByIdDto: GetTodoByIdDto): Promise<TodoEntity | undefined> {
		return await this.datasource.getById(getByIdDto);
	}

	async update(updateDto: UpdateTodoDto): Promise<TodoEntity> {
		return await this.datasource.update(updateDto);
	}

	async delete(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		return await this.datasource.delete(getByIdDto);
	}
}
