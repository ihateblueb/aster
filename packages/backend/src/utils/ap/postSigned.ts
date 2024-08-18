import axios from 'axios';
import { createHash, createSign } from 'node:crypto';

import pkg from '../../../../../package.json' with { type: 'json' };
import config from '../config.js';
import db from '../database.js';
import Logger from '../logger.js';

export default async function postSigned(inbox, localUserId, body) {
	if (new URL(inbox).host === new URL(config.get().url).host) {
		Logger.debug('ap', 'not sending post to myself');
	} else {
		let grabbedLocalUser = await db.getRepository('user').findOne({
			where: {
				id: localUserId
			}
		});

		let grabbedLocalUserPriv = await db.getRepository('user_priv').findOne({
			where: {
				id: localUserId
			}
		});

		const inboxUrl = new URL(inbox);

		const digest = createHash('sha256')
			.update(JSON.stringify(body))
			.digest('base64');

		const signer = createSign('sha256');
		const sendDate = new Date().toISOString();

		const stringToSign = `(request-target): post ${inboxUrl.pathname}\nhost: ${inboxUrl.host}\ndate: ${sendDate}\nalgorithm: rsa-sha256\ndigest: SHA-256=${digest}`;
		signer.update(stringToSign);
		signer.end();
		const signedString = signer
			.sign(grabbedLocalUserPriv.private_key)
			.toString('base64');

		const signatureHeader = `keyId="${config.get().url}users/${grabbedLocalUser.id}#main-key",algorithm="rsa-sha256",headers="(request-target) host date algorithm digest",signature="${signedString}"`;

		console.log('!!OUTGOING POST!!');
		console.log(inbox);
		console.log(JSON.stringify(body));
		console.log({
			headers: {
				'Content-Type': 'application/activity+json',
				'User-Agent': `Aster/${pkg.version}`,
				Accept: 'application/activity+json',
				Algorithm: 'rsa-sha256',
				Host: inboxUrl.host,
				Date: sendDate,
				Digest: `SHA-256=${digest}`,
				Signature: signatureHeader
			}
		});
		console.log('!!OUTGOING POST!!');

		if (config.get().plugins.outgoing) {
			await config.get().plugins.outgoing.forEach(async (e) => {
				await import(`../../plugins/outgoing/${e}.js`).then(
					async (plugin) => {
						await plugin.default();
					}
				);
			});
		}

		return await axios
			.post(inbox, body, {
				headers: {
					'Content-Type': 'application/activity+json',
					'User-Agent': `Aster/${pkg.version}`,
					Accept: 'application/activity+json',
					Algorithm: 'rsa-sha256',
					Host: inboxUrl.host,
					Date: sendDate,
					Digest: `SHA-256=${digest}`,
					Signature: signatureHeader
				}
			})
			.then(() => {
				Logger.debug('ap', 'successfully send a post request signed');
			})
			.catch((e) => {
				Logger.error('ap', e);
			});
	}
}
