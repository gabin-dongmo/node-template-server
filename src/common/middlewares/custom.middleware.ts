import { type Response, type NextFunction, type Request } from 'express';

export const writeInConsole = (_req: Request, _res: Response, next: NextFunction): void => {
	next();
};
