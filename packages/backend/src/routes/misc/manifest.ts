import express from 'express';

import MetaService from '../../services/MetaService.js';
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
		let meta = await MetaService.get();
		return res.status(200).send({
			name: meta.name,
			description: meta.description,
			display: 'standalone',
			prefer_related_applications: false,
			background_color: '#140e1b',
			theme_color: '#140e1b'
		});
	}
);

export default router;
