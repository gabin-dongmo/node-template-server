const createTodo = {
	tags: ['ToDos'],
	description: 'Create a new ToDo task',
	operationId: 'createDto',
	requestBody: {
		content: {
			'application/json': {
				schema: {
					$ref: '#/components/schemas/createTodoDto'
				}
			}
		},
		required: true
	},
	responses: {
		'201': {
			description: 'Task created successfully!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							id: {
								type: 'number',
								example: '6'
							},
							text: {
								type: 'string',
								example: 'Clean up bedroom'
							},
							isCompleted: {
								type: 'boolean',
								example: true
							}
						}
					}
				}
			}
		},
		'500': {
			description: 'Internal Server Error',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Internal Server Error'
							}
						}
					}
				}
			}
		}
	}
};
const createTodoDto = {
	type: 'object',
	properties: {
		text: {
			type: 'string',
			example: 'Clean up bedroom'
		}
	}
};

export { createTodo, createTodoDto };
