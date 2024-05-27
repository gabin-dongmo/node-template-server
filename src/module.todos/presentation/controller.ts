import { type Request, type Response } from 'express';
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
import {
	type ErrorResponse,
	ONE,
	PaginationDto,
	type PaginationResponseEntity,
	type SuccessResponse,
	TEN
} from '../../common';
import StatusCode from 'status-code-enum';
import { Log } from '../../log';

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
	logger = Log.getInstance();

	constructor(private readonly repository: TodoRepository) {}

	public getAll = async (
		req: Request<unknown, unknown, unknown, RequestQuery>,
		res: Response<SuccessResponse<PaginationResponseEntity<TodoEntity[]>>>
	): Promise<void> => {
		const { page = ONE, limit = TEN } = req.query;
		const paginationDto = new PaginationDto(+page, +limit);

		this.logger.info('Calling Todo repository:', paginationDto);
		const result = await new GetTodos(this.repository).execute(paginationDto);

		this.logger.info('Getting list of Todo entities:', result);
		res.status(StatusCode.SuccessOK).json({ data: result });
	};

	public getById = async (
		req: Request<Params>,
		res: Response<SuccessResponse<TodoEntity> | ErrorResponse>
	): Promise<unknown> => {
		const id = +req.params.id;
		const getTodoByIdDto = new GetTodoByIdDto(id);
		const result = await new GetTodoById(this.repository).execute(getTodoByIdDto);
		if (!result)
			return res.status(StatusCode.ClientErrorNotFound).json({
				name: 'Not Found',
				message: `Todo with id ${id} not found`
			});
		res.status(StatusCode.SuccessOK).json({ data: result });
	};

	public create = async (
		req: Request<unknown, unknown, RequestBody>,
		res: Response<SuccessResponse<TodoEntity>>
	): Promise<void> => {
		const { text } = req.body;
		const createDto = new CreateTodoDto(text);
		const result = await new CreateTodo(this.repository).execute(createDto);
		res.status(StatusCode.SuccessCreated).json({ data: result });
	};

	public update = async (
		req: Request<Params, unknown, RequestBody>,
		res: Response<SuccessResponse<TodoEntity>>
	): Promise<void> => {
		const id = +req.params.id;
		const updateDto = UpdateTodoDto.create({ ...req.body, id });
		await new UpdateTodo(this.repository).execute(updateDto);
		res.status(StatusCode.SuccessNoContent);
	};

	public discard = async (req: Request<Params>, res: Response<ErrorResponse>): Promise<unknown> => {
		const id = +req.params.id;
		const getTodoByIdDto = new GetTodoByIdDto(id);
		const entity = await new GetTodoById(this.repository).execute(getTodoByIdDto);
		if (!entity)
			return res.status(StatusCode.ClientErrorNotFound).json({
				name: 'Not Found',
				message: `Todo with id ${id} not found`
			});
		await new DeleteTodo(this.repository).execute(getTodoByIdDto);
		res.status(StatusCode.SuccessNoContent);
	};
}
