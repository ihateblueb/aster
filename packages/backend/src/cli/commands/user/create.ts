import { v4 as uuidv4 } from 'uuid';
import { generateKeyPairSync } from 'crypto';
import bcrypt from 'bcryptjs';

import config from '../../../utils/config.js';
import logger from '../../../utils/logger.js';
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
	logger('debug', 'user', options.username);
	logger('debug', 'user', options.password);
	logger('debug', 'user', JSON.stringify(options));

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
		ap_id: `${config.url}users/${userId}`,
		inbox: `${config.url}users/${userId}/inbox`,
		outbox: `${config.url}users/${userId}/outbox`,
		username: options.username,
		host: new URL(config.url).host,
		displayname: options.displayname,
		local: true,
		url: `${config.url}@instanceactor`,
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
		following_url: `${config.url}users/${userId}/following`,
		followers_url: `${config.url}users/${userId}/followers`,
		public_key: publicKey
	};

	logger('debug', 'user', 'to insert into user');
	logger('debug', 'user', JSON.stringify(userToInsert));

	let userPrivToInsert = {
		id: userId,
		password: '',
		private_key: privateKey
	};

	logger('debug', 'user', 'to insert into user_priv');
	logger('debug', 'user', JSON.stringify(userPrivToInsert));

	await db.getRepository('user').insert(userToInsert);
	await db.getRepository('user_priv').insert(userPrivToInsert);
}
