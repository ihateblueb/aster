import express from 'express';
import oapi from '../../utils/apidoc.js';

const router = express.Router();

router.get('/ping', oapi.validPath({
	description: 'Ping server',
	responses: {
		200: {
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							serverTime: { type: 'string' }
						}
					}
				}
			}
		}
	}
}), (res, req) => {
	req.status(200).json({
		serverTime: new Date(Date.now()).toISOString()
	});
});

export default router;
