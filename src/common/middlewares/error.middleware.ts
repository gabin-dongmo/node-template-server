import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError, type ErrorResponse, ValidationError } from '../index';

export const handleError = (error: unknown, _: Request, res: Response<ErrorResponse>, next: NextFunction): void => {
	let statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
	let response: ErrorResponse = {
		name: 'InternalServerError',
		message: 'An internal server error occurred'
	};

	if (error instanceof ValidationError) {
		const { message, name, validationErrors, stack } = error;
		statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
		response = { name, message, validationErrors, stack };
	} else if (error instanceof AppError) {
		const { message, name, stack } = error;
		statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
		response = { name, message, stack };
	}

	res.status(statusCode).json(response);
};
