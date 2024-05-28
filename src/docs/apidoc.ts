import { createTodo, createTodoDto } from './todos';

const apiDocumentation = {
	openapi: '3.0.1',
	info: {
		version: '1.3.0',
		title: 'Task Management API - Documentation',
		description: 'Task Management API',
		termsOfService: 'https://mysite.com/terms',
		contact: {
			name: 'Developer name',
			email: 'dev@example.com',
			url: 'https://devwebsite.com'
		},
		license: {
			name: 'Apache 2.0',
			url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
		}
	},
	servers: [
		{
			url: 'http://localhost:3000/api/v1',
			description: 'Dev Server'
		}
	],
	tags: [
		{
			name: 'ToDos'
		}
	],
	paths: {
		'/todos': {
			post: createTodo
		}
	},
	components: {
		schemas: {
			createTodoDto
		}
	}
};
export default apiDocumentation;
