import { createHash, createSign } from 'node:crypto';
import axios from 'axios';

import pkg from '../../../../../package.json' assert { type: 'json' };
import config from '../config.js';
import db from '../database.js';
import logger from '../logger.js';

export default async function getSigned(url, localUserId?) {
	if (localUserId) {
		var grabbedLocalUser = await db.getRepository('users').findOne({
			where: {
				id: localUserId
			}
		});

		var grabbedLocalUserPriv = await db
			.getRepository('users_priv')
			.findOne({
				where: {
					id: localUserId
				}
			});
	} else {
		// instance actor!! woooooooOOOOOOOOOOO! YEAH!!!!!!!
		var grabbedLocalUser = await db.getRepository('users').findOne({
			where: {
				username: 'instanceactor'
			}
		});

		var grabbedLocalUserPriv = await db
			.getRepository('users_priv')
			.findOne({
				where: {
					id: grabbedLocalUser.id
				}
			});
	}

	console.log('getting note as ' + grabbedLocalUser.username);

	const getUrl = new URL(url);
	const sendDate = new Date().toISOString();

	const stringToSign = `(request-target): get ${getUrl.pathname}\nhost: ${getUrl.host}\ndate: ${sendDate}\naccept: application/activity+json`;

	const digest = createHash('sha256')
		.update(JSON.stringify(stringToSign))
		.digest('base64');

	const signer = createSign('sha256');
	signer.update(stringToSign);
	signer.end();

	const signedString = signer
		.sign(grabbedLocalUserPriv.private_key)
		.toString('base64');

	const signatureHeader = `keyId="${config.url}users/${grabbedLocalUser.id}#main-key",algorithm="rsa-sha256",headers="(request-target) host date accept",signature="${signedString}"`;

	let getResponse = await axios
		.get(url, {
			headers: {
				'Content-Type': 'application/activity+json',
				'User-Agent': `Aster/${pkg.version}`,
				Accept: 'application/activity+json',
				Algorithm: 'rsa-sha256',
				Host: getUrl.host,
				Date: sendDate,
				Digest: `SHA-256=${digest}`,
				Signature: signatureHeader
			}
		})
		.then((res) => {
			return `status ${res.status} returned from attempted get to ${res.config.url}`;
		})
		.catch((e) => {
			logger('error', 'ap', e);
		});

	console.log(getResponse);

	return getResponse;
}
