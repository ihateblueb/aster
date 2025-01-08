import express from 'express';

import ConfigService from '../../services/ConfigService.js';
import SanitizerService from '../../services/SanitizerService.js';
import SearchService from '../../services/SearchService.js';
import oapi from '../../utils/apidoc.js';

const router = express.Router();

router.patch(
	'/api/search',
	oapi.path({
		description: 'Search for notes or a user',
		tags: ['Search'],
		security: [{ auth: [] }],
		requestBody: {
			content: {
				'application/json': {
					type: 'object'
				}
			}
		},
		responses: {
			200: {
				description: 'Return an search results.',
				content: {
					'application/json': {}
				}
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			413: { $ref: '#/components/responses/error-413' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		// ?query=text

		if (!req.query.query)
			return res.status(400).send({ message: 'Query required' });

		let take = ConfigService.timeline.maxObjects;
		if (
			req.query.take &&
			Number(req.query.take) <= ConfigService.timeline.maxObjects
		)
			take = Number(req.query.take);

		let query = SearchService.createQuery(
			SanitizerService.sanitize(String(req.query.query))
		);
		let results = await SearchService.search(['note', 'user'], query, take);

		if (!results) return res.status(404).send({ message: 'Nothing found' });
		return res.status(200).json(results);
	}
);

export default router;
