import { type PaginationDto, type PaginationResponseEntity } from '../../../common';
import { type GetTodoByIdDto, type UpdateTodoDto, type CreateTodoDto } from '../dtos';
import { type TodoEntity } from '../entities';

export abstract class TodoRepository {
	abstract create(createDto: CreateTodoDto): Promise<TodoEntity>;

	abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TodoEntity[]>>;

	abstract getById(getByIdDto: GetTodoByIdDto): Promise<TodoEntity | undefined>;

	abstract update(updateDto: UpdateTodoDto): Promise<TodoEntity>;

	abstract delete(getByIdDto: GetTodoByIdDto): Promise<TodoEntity>;
}
