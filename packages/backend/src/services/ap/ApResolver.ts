import crypto from 'node:crypto';

import pkg from '../../../../../package.json' with { type: 'json' };
import logger from '../../utils/logger.js';
import reduceSubdomain from '../../utils/reduceSubdomain.js';
import ConfigService from '../ConfigService.js';
import ModeratedInstanceService from '../ModeratedInstanceService.js';
import UserService from '../UserService.js';
import ValidationService from '../ValidationService.js';

class ApResolver {
	public async resolveSigned(
		apId: ApId,
		as?: GenericId,
		contentType?: string
	) {
		if (!ValidationService.validUrl(apId)) return;

		if (
			!(await ModeratedInstanceService.allowFetch(
				reduceSubdomain(new URL(apId).host)
			))
		) {
			logger.info('resolver', 'blocked fetch of ');
			return false;
		}

		let [actor, actorPrivate] = await UserService.getFull(
			as ? { id: as } : { username: 'instanceactor' }
		);
		if (!actor || !actorPrivate) throw Error("couldn't get actor");

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
				'Accept':
					contentType ??
					'application/activity+json, application/ld+json',
				'Algorithm': 'rsa-sha256',
				'Date': sendDate,
				'Signature': signatureHeader
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

	public async resolve(apId: ApId, contentType?: string) {
		if (!ValidationService.validUrl(apId)) return;

		if (
			!(await ModeratedInstanceService.allowFetch(
				reduceSubdomain(new URL(apId).host)
			))
		) {
			logger.info('resolver', 'blocked fetch of ');
			return false;
		}

		return await fetch(apId, {
			method: 'GET',
			headers: {
				'User-Agent': `${pkg.name}/${pkg.version}`,
				'Accept':
					contentType ??
					'application/activity+json, application/ld+json'
			}
		})
			.then((e) => {
				logger.debug(
					'resolver',
					'fetched ' + apId + ' unauthenticated'
				);
				return e.json();
			})
			.catch((reason) => {
				logger.error(
					'resolver',
					'failed request to ' +
						apId +
						' with status ' +
						reason?.status
				);
			});
	}
}

export default new ApResolver();
