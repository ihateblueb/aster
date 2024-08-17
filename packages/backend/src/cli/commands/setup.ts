import { v4 as uuidv4 } from 'uuid';
import { generateKeyPairSync } from 'crypto';

import config from '../../utils/config.js';
import Logger from '../../utils/logger.js';
import db from '../../utils/database.js';

export default async function setup() {
	Logger.info('setup', 'initializing database');
	await db.initialize();

	Logger.info('setup', 'checking if instance is already setup');
	let meta = await db.getRepository('meta').createQueryBuilder().getOne();

	if (meta.init) {
		Logger.fatal('setup', 'instance already setup!');
	}

	Logger.info('setup', 'instance not yet setup, continuing');
	Logger.info('setup', 'creating instance actor');

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
		ap_id: `${config.url}users/${iaId}`,
		inbox: `${config.url}users/${iaId}/inbox`,
		outbox: `${config.url}users/${iaId}/outbox`,
		username: 'instanceactor',
		host: new URL(config.url).host,
		displayname: 'Instance Actor',
		local: true,
		url: `${config.url}@instanceactor`,
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
		following_url: `${config.url}users/${iaId}/following`,
		followers_url: `${config.url}users/${iaId}/followers`,
		public_key: publicKey
	};

	Logger.debug('setup', 'to insert into user');
	Logger.debug('setup', JSON.stringify(instanceActorToInsert));

	let instanceActorPrivToInsert = {
		id: iaId,
		private_key: privateKey
	};

	Logger.debug('setup', 'to insert into user_priv');
	Logger.debug('setup', JSON.stringify(instanceActorPrivToInsert));

	await db.getRepository('user').insert(instanceActorToInsert);
	await db.getRepository('user_priv').insert(instanceActorPrivToInsert);

	await db.getRepository('meta').update({}, { init: true });
}
