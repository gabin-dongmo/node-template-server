import { type NextFunction, type Request, type Response } from 'express';
import { AppError, type ErrorResponse, ValidationError } from '../index';
import StatusCode from 'status-code-enum';
import { Log } from '../../log';

export const handleError = (error: unknown, _: Request, res: Response<ErrorResponse>, next: NextFunction): void => {
	let statusCode: StatusCode = StatusCode.ServerErrorInternal;
	let response: ErrorResponse = {
		name: 'InternalServerError',
		message: 'An internal server error occurred'
	};

	if (error instanceof ValidationError) {
		const { message, name, validationErrors, stack } = error;
		statusCode = error.statusCode;
		response = { name, message, validationErrors, stack };
	} else if (error instanceof AppError) {
		const { message, name, stack } = error;
		statusCode = error.statusCode;
		response = { name, message, stack };
	}

	const logger = Log.getInstance();

	logger.error(response.message, error);

	res.status(statusCode).json(response);
};
