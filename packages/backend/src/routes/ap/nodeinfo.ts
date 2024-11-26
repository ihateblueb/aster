import express from 'express';

import oapi from '../../utils/apidoc.js';
import MetaService from '../../services/MetaService';

const router = express.Router();

router.get(
	'/nodeinfo/2.0',
	oapi.path({
		description: 'Fetch nodeinfo 2.0 of instance',
		tags: ['Federation'],
		responses: {
			200: {
				description: 'Return instance nodeinfo.',
				content: {
					'application/activity+json': {}
				}
			},
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		res.setHeader('Content-Type', 'application/activity+json');

		const meta = await MetaService.get();

		return res.status(200).json({
			version: '2.0',
			software: {
				name: meta.software,
				version: meta.version
			},
			protocols: ['activitypub'],
			openRegistrations: Boolean(meta.registrations === "open"),
			usage: {
				users: {
					total: meta.stats.user
				},
				localPosts: meta.stats.note
			}
		});
	}
);

router.get(
	'/nodeinfo/2.1',
	oapi.path({
		description: 'Fetch nodeinfo 2.1 of instance',
		tags: ['Federation'],
		responses: {
			200: {
				description: 'Return instance nodeinfo.',
				content: {
					'application/activity+json': {}
				}
			},
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		res.setHeader('Content-Type', 'application/activity+json');
		
		const meta = await MetaService.get();

		return res.status(200).json({
			version: '2.1',
			software: {
				name: meta.software,
				version: meta.version
			},
			protocols: ['activitypub'],
			openRegistrations: Boolean(meta.registrations === "open"),
			usage: {
				users: {
					total: meta.stats.user
				},
				localPosts: meta.stats.note
			}
		});
	}
);

export default router;
