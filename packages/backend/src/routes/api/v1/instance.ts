import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import config from '../../../utils/config.js';
import db from '../../../utils/database.js';
import logger from '../../../utils/logger.js';
import sanitize from '../../../utils/sanitize.js';
import verifyToken from '../../../utils/auth/verifyToken.js';

const router = express.Router();

router.get('/api/v1/instance/:host', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.host) {
		return res.status(400).json({
			message: 'Host parameter required'
		});
	} else {
		var grabbedInstance = await db.getRepository('instances').findOne({
			where: {
				host: req.params.host
			}
		});

		if (grabbedInstance) {
			var instanceJson = {};

			instanceJson['id'] = grabbedInstance.id;
			instanceJson['host'] = grabbedInstance.host;
			instanceJson['name'] = grabbedInstance.name;
			instanceJson['description'] = grabbedInstance.description;
			instanceJson['color'] = grabbedInstance.color;
			instanceJson['software'] = grabbedInstance.software;
			instanceJson['version'] = grabbedInstance.version;
			instanceJson['icon'] = grabbedInstance.icon;
			instanceJson['maintainer'] = grabbedInstance.maintainer;
			instanceJson['maintainer_email'] = grabbedInstance.maintainer_email;
			instanceJson['created_at'] = grabbedInstance.created_at;
			instanceJson['updated_at'] = grabbedInstance.updated_at;
			instanceJson['last_communicated'] =
				grabbedInstance.last_communicated;
			instanceJson['responding'] = grabbedInstance.responding;
			instanceJson['user_count'] = grabbedInstance.user_count;
			instanceJson['note_count'] = grabbedInstance.note_count;
			instanceJson['suspended'] = grabbedInstance.suspended;
			instanceJson['silenced'] = grabbedInstance.silenced;
			instanceJson['mod_note'] = grabbedInstance.mod_note;

			res.status(200).json(instanceJson);
		} else {
			return res.status(404).json({
				message: 'Note does not exist'
			});
		}
	}
});

/*
	Note Interactions
*/

// report instance
router.post(`/api/v1/intance/:host/report`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (req.params.host) {
		if (authRes.status === 200) {
			logger('debug', 'instance', 'instance report requested');
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
