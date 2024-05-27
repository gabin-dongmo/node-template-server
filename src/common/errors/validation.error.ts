import { type ValidationType } from '../types';
import StatusCode from 'status-code-enum';

export class ValidationError extends Error {
	public readonly statusCode: StatusCode;
	public readonly validationErrors: ValidationType[];

	constructor(validationErrors: ValidationType[]) {
		super('Validation Error');
		Object.setPrototypeOf(this, new.target.prototype);
		this.statusCode = StatusCode.ClientErrorBadRequest;
		this.validationErrors = validationErrors;
		Error.captureStackTrace(this);
	}
}
