import axios from 'axios';
import { createHash, createSign } from 'node:crypto';

import pkg from '../../../../../package.json' with { type: 'json' };
import config from '../config.js';
import db from '../database.js';
import logger from '../logger.js';
import httpSignature from '@peertube/http-signature';
import getRemoteInstance from './getRemoteInstance.js';
import isValidUrl from '../isValidUrl.js';

export default async function getSigned(url, localUserId?) {
	if (isValidUrl(url)) {
		let grabbedLocalUser;
		let grabbedLocalUserPriv;

		if (localUserId) {
			grabbedLocalUser = await db.getRepository('user').findOne({
				where: {
					id: localUserId
				}
			});

			grabbedLocalUserPriv = await db.getRepository('user_priv').findOne({
				where: {
					id: localUserId
				}
			});
		} else {
			// instance actor!! woooooooOOOOOOOOOOO! YEAH!!!!!!!
			grabbedLocalUser = await db.getRepository('user').findOne({
				where: {
					username: 'instanceactor'
				}
			});

			grabbedLocalUserPriv = await db.getRepository('user_priv').findOne({
				where: {
					id: grabbedLocalUser.id
				}
			});
		}

		logger(
			'debug',
			'ap',
			'getting ' + url + ' as ' + grabbedLocalUser.username
		);

		const getUrl = new URL(url);
		const sendDate = new Date(Date.now()).toISOString();

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

		return await axios
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
				return {
					error: false,
					status: 200,
					data: res.data
				};
			})
			.catch((e) => {
				logger('error', 'ap', e);
				return {
					error: true,
					status: e.response.status,
					data: {}
				};
			});
	} else {
		logger('error', 'ap', 'failed fetch. url invalid');
		return {
			error: true,
			status: 500,
			data: {}
		};
	}
}
