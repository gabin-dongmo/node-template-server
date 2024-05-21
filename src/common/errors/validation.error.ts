import { StatusCodes } from 'http-status-codes';
import { type ValidationType } from '../types';

export class ValidationError extends Error {
	public readonly statusCode: StatusCodes;
	public readonly validationErrors: ValidationType[];

	constructor(validationErrors: ValidationType[]) {
		super('Validation Error');
		Object.setPrototypeOf(this, new.target.prototype);
		this.statusCode = StatusCodes.BAD_REQUEST;
		this.validationErrors = validationErrors;
		Error.captureStackTrace(this);
	}
}
