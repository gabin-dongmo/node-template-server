import compression from 'compression';
import express, { type Router, type Request, type Response } from 'express';
import { HttpCode, setCors, writeInConsole, handleError, setRateLimit, notFoundHandler } from './common';

interface ServerOptions {
	port: number;
	routes: Router;
	apiPrefix: string;
}

export class Server {
	private readonly app = express();
	private readonly port: number;
	private readonly routes: Router;
	private readonly apiPrefix: string;

	constructor(options: ServerOptions) {
		const { port, routes, apiPrefix } = options;
		this.port = port;
		this.routes = routes;
		this.apiPrefix = apiPrefix;
	}

	async start(): Promise<void> {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(compression());
		this.app.use(setRateLimit());
		this.app.use(writeInConsole);
		this.app.use(setCors);
		this.app.get('/', (_req: Request, res: Response) =>
			res.status(HttpCode.OK).send({
				message: `Welcome to Initial API! \n Endpoints available at http://localhost:${this.port}/`
			})
		);
		this.app.use(this.apiPrefix, this.routes);
		//* Handle not found routes in /api/v1/* (only if 'Public content folder' is not available)
		this.routes.all('*', notFoundHandler);
		this.app.use(handleError);

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}...`);
		});
	}
}
