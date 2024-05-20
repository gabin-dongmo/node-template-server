import { envs } from './common';
import { AppRoutes } from './routes';
import { Server } from './server';

(() => {
	main();
})();

function main(): void {
	const server = new Server({
		port: envs.PORT,
		apiPrefix: envs.API_PREFIX,
		routes: AppRoutes.routes
	});
	void server.start();
}
