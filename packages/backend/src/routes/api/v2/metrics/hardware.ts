import express from 'express';
import os from 'node:os';
import si from 'systeminformation';

import config from '../../../../utils/config.js';
import db from '../../../../utils/database.js';

const router = express.Router();

router.get('/api/v2/metrics/hardware', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let hardwareJson = {};

	if (config.get().stats.os) {
		hardwareJson['os'] = (await si.osInfo()).distro;
	}

	if (config.get().stats.kernel) {
		hardwareJson['kernel'] = (await si.osInfo()).kernel;
	}

	if (config.get().stats.platform) {
		hardwareJson['platform'] = (await si.osInfo()).platform;
	}

	if (config.get().stats.arch) {
		hardwareJson['arch'] = (await si.osInfo()).arch;
	}

	if (config.get().stats.uptime) {
		hardwareJson['uptime'] = os.uptime();
	}

	if (config.get().stats.node) {
		hardwareJson['node'] = process.version;
	}

	if (config.get().stats.postgres) {
		hardwareJson['postgres'] =
			'v' +
			(await db
				.query('SHOW server_version')
				.then((x) => x[0].server_version));
	}

	if (config.get().stats.cpu) {
		hardwareJson['cpu'] = {
			model: os.cpus()[0].model,
			cores: os.cpus().length
		};
	}

	if (config.get().stats.memory) {
		hardwareJson['memory'] = await si.mem();
	}

	if (config.get().stats.filesystem) {
		hardwareJson['filesystem'] = await si.fsSize();
	}

	res.status(200).json(hardwareJson);
});

export default router;
