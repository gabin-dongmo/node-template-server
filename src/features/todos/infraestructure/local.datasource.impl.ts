// src\features\todos\infraestructure\local.datasource.impl.ts

import { ONE, ZERO } from '../../../core/constants';
import { AppError } from '../../../core/errors/custom.error';
import { ValidationError } from '../../../core/errors/validation.error';
import { PaginationDto, type PaginationResponseEntity } from '../../shared/domain';
import { type TodoDatasource } from '../domain/datasources/datasource';
import { CreateTodoDto, GetTodoByIdDto, UpdateTodoDto } from '../domain/dtos';
import { TodoEntity } from '../domain/entities/todo.entity';

const TODOS_MOCK = [
	{
		id: 1,
		text: 'First TODO...',
		isCompleted: false
	},
	{
		id: 2,
		text: 'Second TODO...',
		isCompleted: false
	}
];

export class TodoDatasourceImpl implements TodoDatasource {
	public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TodoEntity[]>> {
		const errors = PaginationDto.validate(pagination);
		if (errors.length > ZERO) throw new ValidationError(errors);
		const { page, limit } = pagination;

		const todos = TODOS_MOCK;
		const total = TODOS_MOCK.length;

		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			results: todos.map((todo) => TodoEntity.fromJson(todo)),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}

	public async getById(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		const errors = GetTodoByIdDto.validate(getByIdDto);
		if (errors.length > ZERO) throw new ValidationError(errors);
		const todo = TODOS_MOCK.find((todo) => todo.id === getByIdDto.id);
		if (!todo) throw AppError.notFound(`Todo with id ${getByIdDto.id} not found`);
		return TodoEntity.fromJson(todo);
	}

	public async create(createDto: CreateTodoDto): Promise<TodoEntity> {
		const errors = CreateTodoDto.validate(createDto);
		if (errors.length > ZERO) throw new ValidationError(errors);
		const createdTodo = { id: TODOS_MOCK.length + ONE, ...createDto };
		// TODO: complete implementation
		return TodoEntity.fromJson(createdTodo);
	}

	public async update(updateDto: UpdateTodoDto): Promise<TodoEntity> {
		const errors = UpdateTodoDto.validate(updateDto);
		if (errors.length > ZERO) throw new ValidationError(errors);
		await this.getById(updateDto);
		// TODO: complete implementation
		return TodoEntity.fromJson({ ...updateDto });
	}

	public async delete(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		const errors = GetTodoByIdDto.validate(getByIdDto);
		if (errors.length > ZERO) throw new ValidationError(errors);
		await this.getById(getByIdDto);
		// TODO: complete implementation
		const deletedTodo = TODOS_MOCK[ZERO];
		return TodoEntity.fromJson(deletedTodo);
	}
}