import isValidUrl from '../../utils/isValidUrl.js';
import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import crypto from 'node:crypto';
import config from '../../utils/config.js';
import pkg from '../../../../../package.json';

class ApResolverService {
	public async getSigned(
		apId: string,
		as?: string
	): Promise<object | boolean> {
		if (!isValidUrl(apId)) return;

		let user;
		let userPriv;

		user = await db.getRepository('user').findOne({
			where: as
				? {
						id: as
					}
				: {
						username: 'instanceactor'
					}
		});

		userPriv = await db.getRepository('user_priv').findOne({
			where: {
				id: user.id
			}
		});

		logger.debug('ap', 'getting ' + apId + ' as ' + user.username);

		const url = new URL(apId);
		const sendDate = new Date(Date.now()).toUTCString();

		const stringToSign = `(request-target): get ${url.pathname}\nhost: ${url.host}\ndate: ${sendDate}\naccept: application/activity+json, application/ld+json`;

		const signature = crypto
			.sign('sha256', Buffer.from(stringToSign), userPriv.private_key)
			.toString('base64');

		const signatureHeader = `keyId="${config.get().url}users/${user.id}#main-key",algorithm="rsa-sha256",headers="(request-target) host date accept",signature="${signature}"`;

		let request = await fetch(url, {
			method: 'GET',
			headers: {
				'User-Agent': `Aster/${pkg.version}`,
				Accept: 'application/activity+json, application/ld+json',
				Algorithm: 'rsa-sha256',
				Date: sendDate,
				Signature: signatureHeader
			}
		});

		if (request.ok) {
			return request.json();
		} else {
			logger.error(
				'resolver',
				'failed signed request to ' +
					url +
					'with status ' +
					request.status
			);
			return false;
		}
	}

	public async get(apId: string): Promise<object | boolean> {
		if (!isValidUrl(apId)) return;

		let request = await fetch(apId, {
			method: 'GET',
			headers: {
				'User-Agent': `Aster/${pkg.version}`,
				Accept: 'application/activity+json, application/ld+json'
			}
		});

		if (request.ok) {
			return request.json();
		} else {
			logger.error(
				'resolver',
				'failed signed request to ' +
					apId +
					'with status ' +
					request.status
			);
			return false;
		}
	}
}

export default new ApResolverService();
