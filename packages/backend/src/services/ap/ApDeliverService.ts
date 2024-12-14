import * as punycode from 'node:punycode';

import crypto from 'crypto';
import { ObjectLiteral } from 'typeorm';

import pkg from '../../../../../package.json' with { type: 'json' };
import config from '../../utils/config.js';
import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import reduceSubdomain from '../../utils/reduceSubdomain.js';
import IdService from '../IdService.js';
import QueueService from '../QueueService.js';
import RelationshipService from '../RelationshipService.js';
import UserService from '../UserService.js';

class ApDeliverService {
	public async deliverToFollowers(body, as: GenericId) {
		const relationships = await RelationshipService.getFollowers(as);

		for (const i in relationships) {
			const follower = relationships[i].from;

			await QueueService.deliver.add(IdService.generate(), {
				as: as,
				inbox: follower.inbox,
				body: body
			});
		}
	}

	public async deliver(data) {
		if (!data.body) throw new Error('cannot deliver with no body');
		if (!data.inbox) throw new Error('cannot deliver with to nobody');

		const deliverHost = punycode.toASCII(
			reduceSubdomain(new URL(data.inbox).host)
		);

		const moderatedInstance = await db
			.getRepository('moderated_instance')
			.findOne({
				where: {
					host: deliverHost
				}
			});

		if (moderatedInstance && !moderatedInstance.deliver)
			return 'cannot deliver to no deliver instance ' + deliverHost;

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
		const sendDate = new Date().toUTCString();

		const digest = crypto
			.createHash('sha256')
			.update(JSON.stringify(data.body))
			.digest('base64');

		const stringToSign = `(request-target): post ${inboxUrl.pathname}\nhost: ${inboxUrl.host}\ndate: ${sendDate}\nalgorithm: rsa-sha256\ndigest: SHA-256=${digest}`;

		const signature = crypto
			.sign('sha256', Buffer.from(stringToSign), asPrivate.privateKey)
			.toString('base64');

		const signatureHeader = `keyId="${config.url}users/${as.id}#main-key",algorithm="rsa-sha256",headers="(request-target) host date algorithm digest",signature="${signature}"`;

		return await fetch(inboxUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/activity+json',
				'User-Agent': `${pkg.name}/${pkg.version}`,
				Accept: 'application/activity+json',
				Host: inboxUrl.host,
				Date: sendDate,
				Algorithm: 'rsa-sha256',
				Digest: `SHA-256=${digest}`,
				Signature: signatureHeader
			},
			body: JSON.stringify(data.body)
		})
			.then(async (e) => {
				logger.debug(
					'deliver',
					'posted to ' + inboxUrl + ' as @' + as.username
				);
				console.log(e.status);
				if (!e.ok) throw new Error(e.status.toString());
				return true;
			})
			.catch((err) => {
				logger.error(
					'deliver',
					'failed to post to ' + inboxUrl + ' as @' + as.username
				);
				throw new Error(err);
			});
	}
}

export default new ApDeliverService();
