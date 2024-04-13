// src\features\todos\presentation\controller.ts

import { type NextFunction, type Request, type Response } from 'express';
import { type TodoRepository } from '../domain/repositories/respository';
import { type TodoEntity } from '../domain/entities/todo.entity';
import { GetTodos } from '../domain/usecases/getAll.usecase';
import { type SuccessResponse } from '../../../core/types';
import { PaginationDto, type PaginationResponseEntity } from '../../shared/domain';
import { HttpCode, ONE, TEN } from '../../../core/constants';
import { CreateTodoDto, GetTodoByIdDto, UpdateTodoDto } from '../domain/dtos';
import { CreateTodo, DeleteTodo, GetTodoById, UpdateTodo } from '../domain/usecases';

interface Params {
	id: string;
}

interface RequestBody {
	text: string;
	completedAt: string;
}

interface RequestQuery {
	page: string;
	limit: string;
}

export class TodoController {
	//* Dependency injection
	constructor(private readonly repository: TodoRepository) {}

	public getAll = (
		req: Request<unknown, unknown, unknown, RequestQuery>,
		res: Response<SuccessResponse<PaginationResponseEntity<TodoEntity[]>>>,
		next: NextFunction
	): void => {
		const { page = ONE, limit = TEN } = req.query;
		const paginationDto = new PaginationDto(+page, +limit);
		new GetTodos(this.repository)
			.execute(paginationDto)
			.then((result) => res.json({ data: result }))
			.catch((error) => {
				next(error);
			});
	};

	public getById = (req: Request<Params>, res: Response<SuccessResponse<TodoEntity>>, next: NextFunction): void => {
		const id = +req.params.id;
		const getTodoByIdDto = new GetTodoByIdDto(id);
		new GetTodoById(this.repository)
			.execute(getTodoByIdDto)
			.then((result) => res.json({ data: result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBody>,
		res: Response<SuccessResponse<TodoEntity>>,
		next: NextFunction
	): void => {
		const { text } = req.body;
		const createDto = new CreateTodoDto(text);
		new CreateTodo(this.repository)
			.execute(createDto)
			.then((result) => res.status(HttpCode.CREATED).json({ data: result }))
			.catch(next);
	};

	public update = (
		req: Request<Params, unknown, RequestBody>,
		res: Response<SuccessResponse<TodoEntity>>,
		next: NextFunction
	): void => {
		const id = +req.params.id;
		const updateDto = UpdateTodoDto.create({ ...req.body, id });
		new UpdateTodo(this.repository)
			.execute(updateDto)
			.then((result) => res.json({ data: result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response<SuccessResponse<TodoEntity>>, next: NextFunction): void => {
		const id = +req.params.id;
		const getTodoByIdDto = new GetTodoByIdDto(id);
		new DeleteTodo(this.repository)
			.execute(getTodoByIdDto)
			.then((result) => res.json({ data: result }))
			.catch(next);
	};
}