import rateLimit, { type RateLimitRequestHandler } from 'express-rate-limit';
import { envs } from '../config';

export const setRateLimit = (): RateLimitRequestHandler =>
	rateLimit({
		limit: envs.RATE_LIMIT,
		windowMs: envs.RATE_LIMIT_WINDOWSMS,
		message: 'Too many requests from this IP, please try again in one hour'
	});
