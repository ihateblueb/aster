import { createHash, createSign } from 'node:crypto';
import logger from '../logger';
import config from '../config';
import db from '../database';

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
	const sendDate = new Date().toUTCString();
	const digest = createHash('sha256')
		.update(JSON.stringify(body))
		.digest('base64');

	const signer = createSign('sha256');

	const stringToSign = `(request-target): post ${inboxUrl.pathname}\nhost: ${inboxUrl.host}\ndate: ${sendDate}\nalgorithm: rsa-sha256\ndigest: SHA-256=${digest}`;
	signer.update(stringToSign);
	signer.end();
	const signedString = signer
		.sign(grabbedLocalUserPriv.privateKey)
		.toString('base64');
	const signatureHeader = `keyId="${config.url}users/${grabbedLocalUser.id}#main-key",algorithm="rsa-sha256",headers="(request-target) host date algorithm digest",signature="${signedString}"`;

	return await fetch(inbox, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/activity+json',
			'User-Agent': `Aster/${pkg.version}`,
			Algorithim: 'rsa-sha256',
			Host: inboxUrl.host,
			Date: sendDate,
			Digest: `SHA-256=${digest}`,
			Signature: signatureHeader
		},
		body: body
	});
}
