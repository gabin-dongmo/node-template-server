import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';

export const notFoundHandler = (req: Request, _: Response, next: NextFunction): void => {
	next(AppError.notFound(`Cant find ${req.originalUrl} on this server!`));
};
