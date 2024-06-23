import pkg from '../../../../package.json' with { type: 'json' };
import pkgFe from '../../../frontend/package.json' with { type: 'json' };
import pkgBe from '../../package.json' with { type: 'json' };

import readlineSync from 'readline-sync';
import { spawnSync } from 'child_process';
import { generateKeyPairSync } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import config from '../utils/config.js';
import db from '../utils/database.js';
import logger from '../utils/logger.js';
import { read } from 'fs';

process.title = 'Aster CLI';

/*

if (readlineSync.keyInYN('have you already run migrations?')) {
	console.log('skipping migrations.');
	console.log('');
} else {
	let migrationChild = spawnSync('pnpm', ['migrate']);
	console.log(migrationChild.stdout.toString());
}

if (readlineSync.keyInYN('would you like to create an instance actor?')) {
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

	logger('info', 'init', JSON.stringify(instanceActorToInsert));

	let instanceActorPrivToInsert = {
		id: iaId,
		private_key: privateKey
	};

	logger('info', 'init', JSON.stringify(instanceActorPrivToInsert));
	console.log('');

	if (readlineSync.keyInYN('insert instance actor?')) {
		await db.getRepository('user').insert(instanceActorToInsert);
		await db.getRepository('user_priv').insert(instanceActorPrivToInsert);
	} else {
		console.log('cancelling creating instance actor. not inserted.');
		console.log('');
	}
} else {
	console.log('skipping creating an instance actor.');
	console.log('');
}

if (readlineSync.keyInYN('what should your instance be named')) {
} else {
}

*/

readlineSync.promptCLLoop({
	db: function (action, key, val) {
		if (action === 'set') {
			if (
				readlineSync.keyInYN(
					`[db set] are you sure you'd like to set ${key} to ${val}?`
				)
			) {
				console.log('[db set] change done');
			} else {
				console.log('[db set] change cancelled');
			}
		} else if (action === 'get') {
		} else if (action === 'del') {
			if (
				readlineSync.keyInYN(
					`[db del] are you sure you'd like to delete ${key} to ${val}?`
				)
			) {
				console.log('[db del] change done');
			} else {
				console.log('[db del] change cancelled');
			}
		}
	},
	init: function () {
		console.log('[init] ');
	},
	bye: function () {
		console.log('goodbye :wavesmiley:');
		return true;
	}
});
