import express from 'express';

import verifyToken from '../../../utils/auth/verifyToken.js';
import db from '../../../utils/database.js';
import logger from '../../../utils/logger.js';
import getRemoteInstance from '../../../utils/ap/getRemoteInstance.js';

const router = express.Router();

router.get('/api/v2/instance/:host', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.host) {
		return res.status(400).json({
			message: 'Host parameter required'
		});
	} else {
		let grabbedInstance = await db
			.getRepository('instance')
			.createQueryBuilder()
			.where({ host: req.params.host })
			.getOne();

		getRemoteInstance(req.params.host);

		if (grabbedInstance) {
			res.status(200).json(grabbedInstance);
		} else {
			return res.status(404).json({
				message: 'Instance does not exist'
			});
		}
	}
});

/*
	Note Interactions
*/

// report instance
router.post(`/api/v2/intance/:host/report`, async (req, res) => {
	let authRes = await verifyToken(req);

	if (req.params.host) {
		if (authRes.status === 200) {
			logger.debug('instance', 'instance report requested');
			return res.status(501).json({
				message: 'Not implemented'
			});
		} else {
			return res.status(authRes.status).json({
				message: authRes.message
			});
		}
	} else {
		return res.status(400).json({
			message: 'Host parameter required'
		});
	}
});

export default router;
