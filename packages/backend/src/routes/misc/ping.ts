import express from 'express';

import oapi from '../../utils/apidoc.js';
import IdService from '../../services/IdService.js';
import logger from '../../utils/logger.js';

const router = express.Router();

router.get(
	'/ping',
	oapi.validPath({
		description: 'Ping server',
		tags: ['Miscellaneous'],
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
	}),
	(req, res) => {
		let asIds = []

		for (let i = 0; i < 1000000; i++) {
			let genId = IdService.generateAs()
			console.log(i + '	' + genId)
			asIds.push(genId)
			if (asIds.includes(genId)) {
				logger.fatal('id', 'ID COLLISION')
			}
		}

		res.status(200).json({
			serverTime: new Date(Date.now()).toISOString(),
			id: {
				default: IdService.generate(),
				as: IdService.generateAs(),
				aid: IdService.generateAid(),
				aidx: IdService.generateAidx(),
				meid: IdService.generateMeid(),
				meidg: IdService.generateMeidg(),
				objectid: IdService.generateObjectId(),
				ulid: IdService.generateUlid(),
				uuidv4: IdService.generateUuidv4(),
				uuidv7: IdService.generateUuidv7()
			}
		});
	}
);

export default router;
