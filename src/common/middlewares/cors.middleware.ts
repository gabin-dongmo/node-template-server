import { type Response, type NextFunction, type Request } from 'express';

export const setCors = (req: Request, res: Response, next: NextFunction): void => {
	const allowedOrigins = ['http://localhost:3000'];
	const origin = req.headers.origin;
	if (origin && allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
};
