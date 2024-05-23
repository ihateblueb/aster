import { createHash, createSign } from 'node:crypto';
import logger from '../logger.js';
import config from '../config.js';
import db from '../database.js';

import axios from 'axios';

import pkg from '../../../../../package.json' assert { type: 'json' };

export default async function postSigned(inbox, localUserId, body) {
	let grabbedLocalUserDb = await db.getRepository('users').find({
		where: {
			id: localUserId
		}
	});

	let grabbedLocalUser = grabbedLocalUserDb[0];

	let grabbedLocalUserPrivDb = await db.getRepository('users_priv').find({
		where: {
			id: localUserId
		}
	});

	let grabbedLocalUserPriv = grabbedLocalUserPrivDb[0];

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

	const signatureHeader = `keyId="${config.url}users/${grabbedLocalUser.id}#main-key",algorithm="rsa-sha256",headers="(request-target) host date algorithm digest",signature="${signedString}"`;

	let inboxResponse = await axios
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
		.then((res) => {
			if (res.status !== 202) {
				logger(
					'error',
					'ap',
					`status ${res.status} returned from attempted post ${res.config.url}`
				);
			}
		});

	return inboxResponse;
}
