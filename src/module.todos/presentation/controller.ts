import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
	CreateTodo,
	DeleteTodo,
	GetTodoById,
	UpdateTodo,
	CreateTodoDto,
	GetTodoByIdDto,
	UpdateTodoDto,
	GetTodos,
	type TodoEntity,
	type TodoRepository
} from '../domain';
import { ONE, PaginationDto, type PaginationResponseEntity, type SuccessResponse, TEN } from '../../common';

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
	constructor(private readonly repository: TodoRepository) {}

	public getAll = (
		req: Request<unknown, unknown, unknown, RequestQuery>,
		res: Response<SuccessResponse<PaginationResponseEntity<TodoEntity[]>>>
	): void => {
		const { page = ONE, limit = TEN } = req.query;
		const paginationDto = new PaginationDto(+page, +limit);
		void new GetTodos(this.repository)
			.execute(paginationDto)
			.then((result) => res.status(StatusCodes.OK).json({ data: result }));
	};

	public getById = (req: Request<Params>, res: Response<SuccessResponse<TodoEntity>>): void => {
		const id = +req.params.id;
		const getTodoByIdDto = new GetTodoByIdDto(id);
		void new GetTodoById(this.repository)
			.execute(getTodoByIdDto)
			.then((result) => res.status(StatusCodes.OK).json({ data: result }));
	};

	public create = (req: Request<unknown, unknown, RequestBody>, res: Response<SuccessResponse<TodoEntity>>): void => {
		const { text } = req.body;
		const createDto = new CreateTodoDto(text);
		void new CreateTodo(this.repository)
			.execute(createDto)
			.then((result) => res.status(StatusCodes.CREATED).json({ data: result }));
	};

	public update = (req: Request<Params, unknown, RequestBody>, res: Response<SuccessResponse<TodoEntity>>): void => {
		const id = +req.params.id;
		const updateDto = UpdateTodoDto.create({ ...req.body, id });
		void new UpdateTodo(this.repository).execute(updateDto).then((result) => res.status(StatusCodes.NO_CONTENT));
	};

	public discard = (req: Request<Params>, res: Response<SuccessResponse<TodoEntity>>): void => {
		const id = +req.params.id;
		const getTodoByIdDto = new GetTodoByIdDto(id);
		void new DeleteTodo(this.repository).execute(getTodoByIdDto).then((result) => res.status(StatusCodes.NO_CONTENT));
	};
}
