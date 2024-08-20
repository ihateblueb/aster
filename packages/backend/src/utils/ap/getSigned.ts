import axios from 'axios';
import crypto from 'node:crypto';

import pkg from '../../../../../package.json' with { type: 'json' };
import config from '../config.js';
import db from '../database.js';
import Logger from '../logger.js';
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

		Logger.debug(
			'ap',
			'getting ' + url + ' as ' + grabbedLocalUser.username
		);

		const getUrl = new URL(url);
		const sendDate = new Date(Date.now()).toUTCString();

		let headers = {
			Accept: 'application/activity+json, application/ld+json',
			Algorithm: 'rsa-sha256',
			Date: sendDate
		};

		const stringToSign = `(request-target): get ${getUrl.pathname}\nhost: ${getUrl.host}\ndate: ${sendDate}\naccept: application/activity+json, application/ld+json`;

		const signature = crypto
			.sign(
				'sha256',
				Buffer.from(stringToSign),
				grabbedLocalUserPriv.private_key
			)
			.toString('base64');

		const signatureHeader = `keyId="${config.get().url}users/${grabbedLocalUser.id}#main-key",algorithm="rsa-sha256",headers="(request-target) host date accept",signature="${signature}"`;

		headers['User-Agent'] = `Aster/${pkg.version}`;
		headers['Signature'] = signatureHeader;

		return await axios
			.get(url, {
				headers: headers
			})
			.then((res) => {
				if (res.data) {
					return {
						error: false,
						status: 200,
						data: res.data
					};
				} else {
					return {
						error: false,
						status: 500,
						data: {}
					};
				}
			})
			.catch((e) => {
				Logger.error('ap', e);
				return {
					error: true,
					status: e.response.status ? e.response.status : 500,
					data: {}
				};
			});
	} else {
		Logger.error('ap', 'failed fetch. url invalid');
		return {
			error: true,
			status: 500,
			data: {}
		};
	}
}
