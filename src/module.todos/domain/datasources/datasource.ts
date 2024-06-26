import { type PaginationDto, type PaginationResponseEntity } from '../../../common';
import { type UpdateTodoDto, type CreateTodoDto, type GetTodoByIdDto } from '../dtos';
import { type TodoEntity } from '../entities';

export abstract class TodoDatasource {
	abstract create(createDto: CreateTodoDto): Promise<TodoEntity>;

	abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TodoEntity[]>>;

	abstract getById(getByIdDto: GetTodoByIdDto): Promise<TodoEntity | undefined>;

	abstract update(updateDto: UpdateTodoDto): Promise<TodoEntity>;

	abstract delete(getByIdDto: GetTodoByIdDto): Promise<TodoEntity>;
}
