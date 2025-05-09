import * as punycode from 'node:punycode';

import crypto from 'crypto';

import pkg from '../../../../../package.json' with { type: 'json' };
import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import reduceSubdomain from '../../utils/reduceSubdomain.js';
import ConfigService from '../ConfigService.js';
import IdService from '../IdService.js';
import ModeratedInstanceService from '../ModeratedInstanceService.js';
import QueueService from '../QueueService.js';
import RelationshipService from '../RelationshipService.js';
import UserService from '../UserService.js';

class ApDeliverService {
	public async deliverToInboxes(
		body: ApObject,
		inboxes: Inbox[],
		as: GenericId
	) {
		for (const inbox of inboxes) {
			await QueueService.deliver.add(IdService.generate(), {
				as: as,
				inbox: inbox,
				body: body
			});
		}
	}

	public async deliverToFollowers(body: ApObject, as: GenericId) {
		const relationships = await RelationshipService.getFollowers(as);

		let inboxes: Inbox[] = [];

		for (const relationship of relationships) {
			inboxes.push(relationship.from.inbox);
		}

		await this.deliverToInboxes(body, inboxes, as);
	}

	public async deliverToPeers(body: ApObject, as: GenericId) {
		const peers = await db.getRepository('instance').find();

		let inboxes: Inbox[] = [];

		for (const peer of peers) {
			const user = await UserService.get({
				host: peer.host
			});

			if (user) inboxes.push(user.inbox);
		}

		await this.deliverToInboxes(body, inboxes, as);
	}

	public async deliver(data: { body: ApObject; inbox: ApId; as: GenericId }) {
		if (!data.body) throw new Error('cannot deliver with no body');
		if (!data.inbox) throw new Error('cannot deliver with to nobody');

		const deliverHost = punycode.toASCII(
			reduceSubdomain(new URL(data.inbox).host)
		);

		if (!(await ModeratedInstanceService.allowDeliver(deliverHost)))
			return 'cannot deliver to no deliver instance ' + deliverHost;

		let [as, asPrivate] = await UserService.getFull(
			data.as ? { id: data.as } : { username: 'instanceactor' }
		);
		if (!as || !asPrivate) throw Error("couldn't get as actor");

		if (new URL(data.inbox).host === ConfigService.url.host) return;

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

		const signatureHeader = `keyId="${ConfigService.url.href}users/${as.id}#main-key",algorithm="rsa-sha256",headers="(request-target) host date algorithm digest",signature="${signature}"`;

		return await fetch(inboxUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/activity+json',
				'User-Agent': `${pkg.name}/${pkg.version}`,
				'Accept': 'application/activity+json',
				'Host': inboxUrl.host,
				'Date': sendDate,
				'Algorithm': 'rsa-sha256',
				'Digest': `SHA-256=${digest}`,
				'Signature': signatureHeader
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
