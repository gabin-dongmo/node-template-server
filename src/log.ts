import { type Logger, format, createLogger, transports } from 'winston';

export class Log {
	private readonly logger: Logger;
	private static _instance: Log;

	private constructor() {
		this.logger = createLogger({
			level: 'info',
			format: format.combine(
				format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
				format.errors({ stack: true }),
				format.splat(),
				format.json()
			),
			transports: [
				new transports.File({ filename: 'error.log', level: 'error' }),
				new transports.File({ filename: 'info.log' })
			]
		});

		if (process.env.NODE_ENV !== 'production') {
			this.logger.add(
				new transports.Console({
					format: format.combine(
						format.colorize({ all: true }),
						format.align(),
						format.prettyPrint(),
						format.printf(({ level, message, timestamp, ...metadata }) => {
							let msg = `[${level}]\t${timestamp} - ${message}`;
							if (metadata) {
								msg += `\n${JSON.stringify(metadata)}`;
							}
							return msg;
						}),
						format.ms()
					)
				})
			);
		}

		this.logger.exceptions.handle(new transports.File({ filename: 'uncaughtException.log' }));

		process.on('unhandledRejection', (e) => {
			// logger.error(e.message, e);
			// process.exit(1);
			throw e;
		});
	}

	private readonly getLogger = (): Logger => this.logger;

	static getInstance = (): Logger => {
		if (!Log._instance) {
			Log._instance = new Log();
		}

		return Log._instance.getLogger();
	};
}
