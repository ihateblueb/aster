import express from 'express';
import os from 'node:os';
import si from 'systeminformation';

import db from '../../../../utils/database.js';
import config from '../../../../utils/config.js';

const router = express.Router();

router.get('/api/v1/metrics/hardware', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let hardwareJson = {};

	if (config.stats.os) {
		hardwareJson['os'] = (await si.osInfo()).distro;
	}

	if (config.stats.kernel) {
		hardwareJson['kernel'] = (await si.osInfo()).kernel;
	}

	if (config.stats.platform) {
		hardwareJson['platform'] = (await si.osInfo()).platform;
	}

	if (config.stats.arch) {
		hardwareJson['arch'] = (await si.osInfo()).arch;
	}

	if (config.stats.uptime) {
		hardwareJson['uptime'] = os.uptime();
	}

	if (config.stats.node) {
		hardwareJson['node'] = process.version;
	}

	if (config.stats.postgres) {
		hardwareJson['postgres'] =
			'v' +
			(await db
				.query('SHOW server_version')
				.then((x) => x[0].server_version));
	}

	if (config.stats.cpu) {
		hardwareJson['cpu'] = {
			model: os.cpus()[0].model,
			cores: os.cpus().length
		};
	}

	if (config.stats.memory) {
		hardwareJson['memory'] = await si.mem();
	}

	if (config.stats.filesystem) {
		hardwareJson['filesystem'] = await si.fsSize();
	}

	res.status(200).json(hardwareJson);
});

export default router;
