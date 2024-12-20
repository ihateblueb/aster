import express from 'express';

import IdService from '../../services/IdService.js';
import MetaService from '../../services/MetaService.js';
import MfmService from '../../services/MfmService.js';
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
		const meta = await MetaService.get();
		return res.status(200).json({});
	}
);

export default router;
