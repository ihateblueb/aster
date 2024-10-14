import express from 'express';
import { In } from 'typeorm';

import pkg from '../../../../../package.json' with { type: 'json' };
import oapi from '../../utils/apidoc.js';
import config from '../../utils/config.js';
import db from '../../utils/database.js';

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

		const userCount = await db.getRepository('user').count({
			where: {
				local: true,
				activated: true,
				suspended: false
			}
		});

		const noteCount = await db
			.getRepository('note')
			.createQueryBuilder('note')
			.leftJoinAndSelect('note.user', 'user')
			.where({
				'user.local': true,
				visibility: In(['public', 'unlisted'])
			})
			.getCount();

		return res.status(200).json({
			version: '2.0',
			software: {
				name: pkg.name,
				version: pkg.version
			},
			protocols: ['activitypub'],
			openRegistrations: (config.registrations = 'open'),
			usage: {
				users: {
					total: userCount
				},
				localPosts: noteCount
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

		const userCount = await db.getRepository('user').count({
			where: {
				local: true,
				activated: true,
				suspended: false
			}
		});

		const noteCount = await db
			.getRepository('note')
			.createQueryBuilder('note')
			.leftJoinAndSelect('note.user', 'user')
			.where({
				'user.local': true,
				visibility: In(['public', 'unlisted'])
			})
			.getCount();

		return res.status(200).json({
			version: '2.1',
			software: {
				name: pkg.name,
				version: pkg.version
			},
			protocols: ['activitypub'],
			openRegistrations: (config.registrations = 'open'),
			usage: {
				users: {
					total: userCount
				},
				localPosts: noteCount
			}
		});
	}
);

export default router;
