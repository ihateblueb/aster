import pkg from '../../../../package.json' with { type: 'json' };
import pkgFe from '../../../frontend/package.json' with { type: 'json' };
import pkgBe from '../../package.json' with { type: 'json' };

import readlineSync from 'readline-sync';
import { spawnSync } from 'child_process';
import { generateKeyPairSync } from 'crypto';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import chalk from 'chalk';

import config from '../utils/config.js';
import db from '../utils/database.js';
import logger from '../utils/logger.js';
import { read } from 'fs';
import { compileFunction } from 'vm';
import getSigned from '../utils/ap/getSigned.js';

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
	db: function (action, key, val, where, is, table) {
		if (action === 'set') {
			if (
				readlineSync.keyInYN(
					`[db set] are you sure you'd like to set ${key} to ${val} where ${where} is ${is} in ${table}?`
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
	createuser: async function (
		username,
		displayname,
		locked,
		discoverable,
		automated,
		bio,
		is_cat,
		speak_as_cat,
		password
	) {
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

		let user = {
			id: userId,
			ap_id: `${config.url}users/${userId}`,
			inbox: `${config.url}users/${userId}/inbox`,
			outbox: `${config.url}users/${userId}/outbox`,
			username: username,
			host: new URL(config.url).host,
			displayname: displayname,
			local: true,
			url: `${config.url}@${username}`,
			locked: locked,
			suspended: false,
			deactivated: false,
			discoverable: discoverable,
			automated: automated,
			bio: bio,
			is_cat: is_cat,
			speak_as_cat: speak_as_cat,
			created_at: new Date(Date.now()).toISOString(),
			updated_at: new Date(Date.now()).toISOString(),
			following_url: `${config.url}users/${userId}/following`,
			followers_url: `${config.url}users/${userId}/followers`,
			public_key: publicKey
		};

		for (const [key, value] of Object.entries(user)) {
			console.log(
				`[${chalk.cyan('createuser')}] [${chalk.green('user')}.${chalk.greenBright(key)}] `
			);
			console.log(value);
		}

		console.log('');

		let userPrivate = {
			id: userId,
			password: password,
			private_key: privateKey
		};

		bcrypt.hash(password, 12, (e, result) => {
			if (e) {
				console.log(e);
			} else {
				console.log(result);
			}
		});

		for (const [key, value] of Object.entries(userPrivate)) {
			console.log(
				`[${chalk.cyan('createuser')}] [${chalk.red('user_priv')}.${chalk.redBright(key)}] `
			);
			console.log(value);
		}
	},
	getsigned: async function (url) {
		console.log(await getSigned(url));
	},
	init: function () {
		console.log('[init] ');
	},
	bye: function () {
		console.log('goodbye :wavesmiley:');
		return true;
	}
});
