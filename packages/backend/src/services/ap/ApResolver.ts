import crypto from 'node:crypto';

import { ObjectLiteral } from 'typeorm';

import pkg from '../../../../../package.json' with { type: 'json' };
import logger from '../../utils/logger.js';
import ConfigService from '../ConfigService.js';
import ModeratedInstanceService from '../ModeratedInstanceService.js';
import UserService from '../UserService.js';
import ValidationService from '../ValidationService.js';

class ApResolver {
	public async resolveSigned(apId: ApId, as?: GenericId) {
		if (!(await ModeratedInstanceService.allowFetch(new URL(apId).host))) {
			logger.info('resolver', 'blocked fetch of ');
			return false;
		}

		let [actor, actorPrivate] = await UserService.getFull(as ? { id: as } : { username: 'instanceactor' });

		if (!ValidationService.validUrl(apId)) return;

		const url = new URL(apId);
		const sendDate = new Date(Date.now()).toUTCString();

		const stringToSign = `(request-target): get ${url.pathname}\nhost: ${url.host}\ndate: ${sendDate}\naccept: application/activity+json, application/ld+json`;

		const signature = crypto
			.sign('sha256', Buffer.from(stringToSign), actorPrivate.privateKey)
			.toString('base64');

		const signatureHeader = `keyId="${ConfigService.url.href}users/${actor.id}#main-key",algorithm="rsa-sha256",headers="(request-target) host date accept",signature="${signature}"`;

		// todo: make sure this is safe
		return await fetch(url, {
			method: 'GET',
			headers: {
				'User-Agent': `${pkg.name}/${pkg.version}`,
				Accept: 'application/activity+json, application/ld+json',
				Algorithm: 'rsa-sha256',
				Date: sendDate,
				Signature: signatureHeader
			}
		})
			.then((e) => {
				logger.debug(
					'resolver',
					'fetched ' + url + ' as @' + actor.username
				);
				return e.json();
			})
			.catch(() => {
				logger.error(
					'resolver',
					'failed to fetch ' + url + ' as @' + actor.username
				);
			});
	}

	public async resolve(apId: ApId): Promise<object | boolean> {
		if (!ValidationService.validUrl(apId)) return;

		const request = await fetch(apId, {
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
				'failed request to ' + apId + 'with status ' + request.status
			);
			return false;
		}
	}
}

export default new ApResolver();
