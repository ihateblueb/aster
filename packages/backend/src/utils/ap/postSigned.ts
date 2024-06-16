import axios from 'axios';
import { createHash, createSign } from 'node:crypto';

import pkg from '../../../../../package.json' assert { type: 'json' };
import config from '../config.js';
import db from '../database.js';
import logger from '../logger.js';

export default async function postSigned(inbox, localUserId, body) {
	let grabbedLocalUser = await db.getRepository('users').findOne({
		where: {
			id: localUserId
		}
	});

	let grabbedLocalUserPriv = await db.getRepository('users_priv').findOne({
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

	const signatureHeader = `keyId="${config.url}users/${grabbedLocalUser.id}#main-key",algorithm="rsa-sha256",headers="(request-target) host date algorithm digest",signature="${signedString}"`;

	let postResponse = await axios
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
		.catch((e) => {
			logger('error', 'ap', e);
		});

	return postResponse;
}
