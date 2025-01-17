import express from 'express';

import oapi from '../../utils/apidoc.js';

const router = express.Router();

router.get(
	'/manifest.json',
	oapi.validPath({
		description: 'Get server-generated manifest.json',
		tags: ['Miscellaneous'],
		responses: {
			200: {
				content: {
					'application/json': {}
				}
			}
		}
	}),
	async (req, res) => {
		return res.status(501).send();
	}
);

export default router;
