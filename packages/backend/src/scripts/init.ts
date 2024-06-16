// to be run ONCE and ONLY ONCE EVER.
// it does not work for some reason
import { generateKeyPairSync } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import config from '../utils/config.js';
import db from '../utils/database.js';
import logger from '../utils/logger.js';

const metaDb = await db.getRepository('meta').find();

const meta = metaDb[0];

if (!meta.init) {
	logger(
		'warn',
		'init',
		'if you have not yet run migrations, this init script will fail'
	);

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

	console.log(instanceActorToInsert);

	//await db.getRepository('users').insert(instanceActorToInsert);

	let instanceActorPrivToInsert = {
		id: iaId,
		private_key: privateKey
	};

	console.log(instanceActorPrivToInsert);

	//await db.getRepository('users_priv').insert(instanceActorPrivToInsert);
} else {
	logger(
		'fatal',
		'init',
		"hey. hey what the fuck do you think you're doing. this script was already run"
	);
}
