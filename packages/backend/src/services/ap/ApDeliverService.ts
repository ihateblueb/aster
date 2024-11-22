import crypto from 'crypto';
import { ObjectLiteral } from 'typeorm';

import pkg from '../../../../../package.json' with { type: 'json' };
import config from '../../utils/config.js';
import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import UserService from '../UserService.js';

class ApDeliverService {
	public async deliver(data) {
		if (!data.body) throw new Error('cannot deliver with no body');
		if (!data.inbox) throw new Error('cannot deliver with to nobody');

		let moderatedInstance = await db
			.getRepository('moderated_instance')
			.findOne({
				where: {
					host: new URL(data.inbox).host
				}
			});

		if (moderatedInstance && !moderatedInstance.deliver)
			throw new Error('cannot deliver with to no deliver instance');

		let as: ObjectLiteral;
		let asPrivate: ObjectLiteral;

		if (data.as) as = await UserService.get({ id: data.as });
		if (data.as)
			asPrivate = await UserService.getPrivate({ user: data.as });

		if (!data.as) as = await UserService.get({ username: 'instanceactor' });
		if (!data.as)
			asPrivate = await UserService.getPrivate({
				user: as.id
			});

		if (new URL(data.inbox).host === new URL(config.url).host) return;

		const inboxUrl = new URL(data.inbox);

		const digest = crypto
			.createHash('sha256')
			.update(JSON.stringify(data.body))
			.digest('base64');

		const signer = crypto.createSign('sha256');

		const sendDate = new Date().toUTCString();

		const stringToSign = `(request-target): post ${inboxUrl.pathname}\nhost: ${inboxUrl.host}\ndate: ${sendDate}\nalgorithm: rsa-sha256\ndigest: SHA-256=${digest}`;
		signer.update(stringToSign);
		signer.end();

		const signedString = signer
			.sign(asPrivate.privateKey)
			.toString('base64');

		const signatureHeader = `keyId="${config.url}users/${as.id}#main-key",algorithm="rsa-sha256",headers="(request-target) host date algorithm digest",signature="${signedString}"`;

		return await fetch(inboxUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/activity+json',
				'User-Agent': `${pkg.name}/${pkg.version}`,
				Accept: 'application/activity+json',
				Algorithm: 'rsa-sha256',
				Host: inboxUrl.host,
				Date: sendDate,
				Digest: `SHA-256=${digest}`,
				Signature: signatureHeader
			},
			body: data.body
		})
			.then(() => {
				logger.debug(
					'deliver',
					'posted to ' + inboxUrl + ' as @' + as.username
				);
				return true;
			})
			.catch((err) => {
				console.log(err);
				logger.error(
					'deliver',
					'failed to post to ' + inboxUrl + ' as @' + as.username
				);
				throw new Error(err);
			});
	}
}

export default new ApDeliverService();
