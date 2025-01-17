import crypto from 'crypto';

import db from '../utils/database.js';
import logger from '../utils/logger.js';
import UserService from './UserService.js';

class SetupService {
	public async try() {
		const instanceActor = await UserService.get({
			username: 'instanceactor'
		}).catch((err) => {
			console.log(err);
			logger.error('setup', "couldn't fetch instance actor");
		});

		if (!instanceActor) {
			logger.info('setup', 'instance actor not found, generating');

			await UserService.register(
				'instanceactor',
				crypto.randomBytes(32).toString('hex')
			)
				.then(() => {
					logger.info(
						'setup',
						'generated instance actor at @instanceactor'
					);
				})
				.catch((err) => {
					console.log(err);
					logger.error('setup', 'failed to generate instance actor');
				});
		}

		const meta = await db.getRepository('meta').findOne({
			where: {}
		});

		if (!meta) {
			await db
				.getRepository('meta')
				.insert({})
				.then(() => {
					logger.info('setup', 'generated instance metadata');
				})
				.catch((err) => {
					console.log(err);
					logger.error(
						'setup',
						'failed to generate instance metadata'
					);
				});
		}
	}
}

export default new SetupService();
