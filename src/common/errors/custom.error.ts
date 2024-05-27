import StatusCode from 'status-code-enum';

interface AppErrorArgs {
	name?: string;
	statusCode: StatusCode;
	message: string;
	isOperational?: boolean;
}

export class AppError extends Error {
	public readonly name: string;
	public readonly statusCode: StatusCode;
	public readonly isOperational: boolean = true;

	private constructor(args: AppErrorArgs) {
		const { message, name, statusCode, isOperational } = args;
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = name ?? 'Error';
		this.statusCode = statusCode;
		if (isOperational !== undefined) this.isOperational = isOperational;
		Error.captureStackTrace(this);
	}

	static badRequest(message: string): AppError {
		return new AppError({ message, statusCode: StatusCode.ClientErrorBadRequest });
	}

	static unauthorized(message: string): AppError {
		return new AppError({ message, statusCode: StatusCode.ClientErrorUnauthorized });
	}

	static forbidden(message: string): AppError {
		return new AppError({ message, statusCode: StatusCode.ClientErrorForbidden });
	}

	static notFound(message: string): AppError {
		return new AppError({ message, statusCode: StatusCode.ClientErrorNotFound });
	}

	static internalServer(message: string): AppError {
		return new AppError({ message, statusCode: StatusCode.ServerErrorInternal });
	}
}
