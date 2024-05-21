import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError, type ErrorResponse, ValidationError } from '../index';

export const handleError = (error: unknown, _: Request, res: Response<ErrorResponse>, next: NextFunction): void => {
	if (error instanceof ValidationError) {
		const { message, name, validationErrors, stack } = error;
		res.statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
		res.json({ name, message, validationErrors, stack });
	} else if (error instanceof AppError) {
		const { message, name, stack } = error;
		res.statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
		res.json({ name, message, stack });
	} else {
		const name = 'InternalServerError';
		const message = 'An internal server error occurred';
		res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
		res.json({ name, message });
	}

	next();
};
