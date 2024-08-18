import { v4 as uuidv4 } from 'uuid';
import { generateKeyPairSync } from 'crypto';
import bcrypt from 'bcryptjs';

import config from '../../../utils/config.js';
import Logger from '../../../utils/logger.js';
import db from '../../../utils/database.js';

export default async function userCreate(options: {
	username;
	password;
	displayname;
	locked;
	suspended;
	deactivated;
	discoverable;
	automated;
	bio;
	is_cat;
	speak_as_cat;
}) {
	Logger.debug('user', options.username);
	Logger.debug('user', options.password);
	Logger.debug('user', JSON.stringify(options));

	const userId = uuidv4();

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

	let userToInsert = {
		id: userId,
		ap_id: `${config.get().url}users/${userId}`,
		inbox: `${config.get().url}users/${userId}/inbox`,
		outbox: `${config.get().url}users/${userId}/outbox`,
		username: options.username,
		host: new URL(config.get().url).host,
		displayname: options.displayname,
		local: true,
		url: `${config.get().url}@instanceactor`,
		locked: options.locked,
		suspended: options.suspended,
		deactivated: options.deactivated,
		discoverable: options.discoverable,
		automated: options.automated,
		bio: options.bio,
		is_cat: options.is_cat,
		speak_as_cat: options.speak_as_cat,
		created_at: new Date(Date.now()).toISOString(),
		updated_at: new Date(Date.now()).toISOString(),
		following_url: `${config.get().url}users/${userId}/following`,
		followers_url: `${config.get().url}users/${userId}/followers`,
		public_key: publicKey
	};

	Logger.debug('user', 'to insert into user');
	Logger.debug('user', JSON.stringify(userToInsert));

	let userPrivToInsert = {
		id: userId,
		password: '',
		private_key: privateKey
	};

	Logger.debug('user', 'to insert into user_priv');
	Logger.debug('user', JSON.stringify(userPrivToInsert));

	await db.getRepository('user').insert(userToInsert);
	await db.getRepository('user_priv').insert(userPrivToInsert);
}
