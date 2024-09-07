import openapi from '@wesleytodd/openapi';
import pkg from '../../../../package.json' assert { type: 'json' };

const oapi = openapi(
	{
		openapi: '3.0.0',
		info: {
			title: 'aster',
			description: "Generated API docs from Aster's source code",
			version: pkg.version
		}
	},
	{
		htmlui: true
	}
);

export default oapi;
