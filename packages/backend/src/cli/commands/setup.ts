import { v4 as uuidv4 } from 'uuid';
import { generateKeyPairSync } from 'crypto';

import config from '../../utils/config.js';
import logger from '../../utils/logger.js';
import db from '../../utils/database.js';

export default async function setup() {
	logger.info('setup', 'initializing database');
	await db.initialize();

	logger.info('setup', 'checking if instance is already setup');
	let meta = await db.getRepository('meta').createQueryBuilder().getOne();

	if (meta.init) {
		Logger.fatal('setup', 'instance already setup!');
	}

	logger.info('setup', 'instance not yet setup, continuing');
	logger.info('setup', 'creating instance actor');

	const iaId = uuidv4();

	const { publicKey, privateKey } = generateKeyPairSync('rsa', {
		modulusLength: 2048,
		publicKeyEncoding: {
			type: 'spki',
			format: 'pem'
		},
		privateKeyEncoding: {
			type: 'pkcs8',
			format: 'pem'
		}
	});

	let instanceActorToInsert = {
		id: iaId,
		ap_id: `${config.get().url}users/${iaId}`,
		inbox: `${config.get().url}users/${iaId}/inbox`,
		outbox: `${config.get().url}users/${iaId}/outbox`,
		username: 'instanceactor',
		host: new URL(config.get().url).host,
		displayname: 'Instance Actor',
		local: true,
		url: `${config.get().url}@instanceactor`,
		locked: true,
		suspended: false,
		deactivated: false,
		discoverable: false,
		automated: true,
		bio: 'automated account required for federation',
		is_cat: true,
		speak_as_cat: false,
		created_at: new Date(Date.now()).toISOString(),
		updated_at: new Date(Date.now()).toISOString(),
		following_url: `${config.get().url}users/${iaId}/following`,
		followers_url: `${config.get().url}users/${iaId}/followers`,
		public_key: publicKey
	};

	logger.debug('setup', 'to insert into user');
	logger.debug('setup', JSON.stringify(instanceActorToInsert));

	let instanceActorPrivToInsert = {
		id: iaId,
		private_key: privateKey
	};

	logger.debug('setup', 'to insert into user_priv');
	logger.debug('setup', JSON.stringify(instanceActorPrivToInsert));

	await db.getRepository('user').insert(instanceActorToInsert);
	await db.getRepository('user_priv').insert(instanceActorPrivToInsert);

	await db.getRepository('meta').update({}, { init: true });
}
