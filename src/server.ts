import 'express-async-errors';
import compression from 'compression';
import express, { type Router, type Request, type Response } from 'express';
import StatusCode from 'status-code-enum';
import { setCors, handleError, setRateLimit, notFoundHandler } from './common';
import { Log } from './log';
import type { Logger } from 'winston';
import swaggerUi from 'swagger-ui-express';
import { apiDocumentation } from './docs';

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
	private readonly logger: Logger;

	constructor(options: ServerOptions) {
		const { port, routes, apiPrefix } = options;
		this.port = port;
		this.routes = routes;
		this.apiPrefix = apiPrefix;
		this.logger = Log.getInstance();
	}

	async start(): Promise<void> {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(compression());
		this.app.use(setRateLimit());
		this.app.use(setCors);
		this.app.get('/', (_req: Request, res: Response) =>
			res.status(StatusCode.SuccessOK).send({
				message: `Welcome to Initial API! \n Endpoints available at http://localhost:${this.port}/`
			})
		);
		const swaggerUiOptions = {
			swaggerOptions: {
				// defaultModelsExpandDepth: -1,
				docExpansion: 'none'
			}
		};
		this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation, swaggerUiOptions));
		this.app.use(this.apiPrefix, this.routes);
		//* Handle not found routes in /api/v1/* (only if 'Public content folder' is not available)
		this.routes.all('*', notFoundHandler);
		this.app.use(handleError);

		this.app.listen(this.port, () => {
			this.logger.info(`Server running on port ${this.port}...`);
		});
	}
}
