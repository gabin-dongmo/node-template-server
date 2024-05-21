import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	API_PREFIX: get('API_PREFIX').default('/api/v1').asString(),
	NODE_ENV: get('NODE_ENV').default('development').asString(),
	RATE_LIMIT: get('RATE_LIMIT').required().asInt(),
	RATE_LIMIT_WINDOWSMS: get('RATE_LIMIT_WINDOWSMS').required().asInt()
};
