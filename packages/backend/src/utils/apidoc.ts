import openapi from '@wesleytodd/openapi';
import pkg from '../../../../package.json' with { type: 'json' };

let oapi = openapi({
	openapi: '3.0.0',
	info: {
		title: 'Aster API',
		version: pkg.version
	}
});

oapi.response('error-201', {
	description: 'Created'
});
oapi.response('error-202', {
	description: 'Accepted'
});
oapi.response('error-204', {
	description: 'No content'
});

oapi.response('error-400', {
	description: 'Bad request',
	content: {
		'application/json': {
			schema: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Bad request' }
				}
			}
		}
	}
});
oapi.response('error-401', {
	description: 'Authentication required, but not valid.',
	content: {
		'application/json': {
			schema: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Unauthorized' }
				}
			}
		}
	}
});
oapi.response('error-403', {
	description: 'Authenticated user is not allowed to access resource.',
	content: {
		'application/json': {
			schema: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Forbidden' }
				}
			}
		}
	}
});
oapi.response('error-404', {
	description: 'Resource not found.',
	content: {
		'application/json': {
			schema: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Not found' }
				}
			}
		}
	}
});
oapi.response('error-410', {
	description: 'Resource gone.',
	content: {
		'application/json': {
			schema: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Gone' }
				}
			}
		}
	}
});
oapi.response('error-413', {
	description: 'Body too large.',
	content: {
		'application/json': {
			schema: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Body too large' }
				}
			}
		}
	}
});
oapi.response('error-418', {
	description: "I'm tired",
	content: {
		'application/json': {
			schema: {
				type: 'object',
				properties: {
					message: { type: 'string', example: "I'm tired" }
				}
			}
		}
	}
});
oapi.response('error-500', {
	description: 'Internal server error',
	content: {
		'application/json': {
			schema: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Internal server error'
					}
				}
			}
		}
	}
});

oapi.schema('Meta', {
	type: 'object',
	required: ['version', 'host', 'registration'],
	properties: {
		host: { type: 'string', example: 'as.example.com' },
		version: { type: 'string', example: pkg.version },
		name: { type: 'string', example: 'Aster' },
		description: {
			type: 'string',
			example: 'a fediverse instance running Aster'
		},
		registration: { type: 'string', example: 'open' }
	}
});
oapi.schema('User', {
	type: 'object',
	required: ['id', 'username'],
	properties: {
		id: { type: 'string', example: '01926979-4e91-7ed5-b865-c88f692c4495' },
		username: { type: 'string', example: 'eeper' },
		displayName: { type: 'string', example: 'the eeper' },
		bio: { type: 'string', example: 'napping... so tired....' }
	}
});

export default oapi;
