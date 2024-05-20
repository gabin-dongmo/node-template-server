import { type Response, type NextFunction, type Request } from 'express';

export class CustomMiddlewares {
	public static writeInConsole = (_req: Request, _res: Response, next: NextFunction): void => {
		next();
	};
}
