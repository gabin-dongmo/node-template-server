import { type HttpCode } from '../constants';
import { type ValidationType } from '../types';

export class ValidationError extends Error {
	public readonly statusCode: HttpCode;
	public readonly validationErrors: ValidationType[];

	constructor(validationErrors: ValidationType[]) {
		super('Validation Error');
		Object.setPrototypeOf(this, new.target.prototype);
		this.statusCode = 400;
		this.validationErrors = validationErrors;
		Error.captureStackTrace(this);
	}
}
