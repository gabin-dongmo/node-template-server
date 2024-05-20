import { Router } from 'express';
import { TodoRoutes } from './module.todos';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/todos', TodoRoutes.routes);

		// rest of routes
		// ...

		return router;
	}
}
