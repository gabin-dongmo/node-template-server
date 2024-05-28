/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { TodoDatasourceImpl, TodoRepositoryImpl } from '../infrastructure';
import { TodoController } from './controller';

export class TodoRoutes {
	static get routes(): Router {
		const router = Router();

		//* This datasource can be change
		const datasource = new TodoDatasourceImpl();
		const repository = new TodoRepositoryImpl(datasource);
		const { getAll, getById, create, update, discard } = new TodoController(repository);

		router.get('/', getAll);
		router.get('/:id', getById);
		router.post('/', create);
		router.put('/:id', update);
		router.delete('/:id', discard);

		// rest of operations
		// ...

		return router;
	}
}
