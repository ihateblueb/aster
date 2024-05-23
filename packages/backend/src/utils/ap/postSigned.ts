import { createHash, createSign } from 'node:crypto';
import logger from '../logger.js';
import config from '../config.js';
import db from '../database.js';

import pkg from '../../../../../package.json' assert { type: 'json' };
import { send } from 'node:process';

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

	let inboxResponse = await fetch(inbox, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/activity+json',
			'User-Agent': `Aster/${pkg.version}`,
			Accept: 'application/activity+json',
			Algorithm: 'rsa-sha256',
			Host: inboxUrl.host,
			Date: sendDate,
			Digest: `SHA-256=${digest}`,
			Signature: signatureHeader
		},
		body: body
	}).then((res) => {
		if (res.status !== 200) {
			logger(
				'error',
				'ap',
				`status ${res.status} returned from attempted post to ${res.url}`
			);
		}
		console.log(res);
	});

	return inboxResponse;
}
