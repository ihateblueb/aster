import punycode from 'node:punycode';

import db from '../utils/database.js';
import reduceSubdomain from '../utils/reduceSubdomain.js';
import IdService from './IdService.js';

class ModeratedInstanceService {
	public async get(where: where) {
		return await db
			.getRepository('moderated_instance')
			.findOne({ where: where });
	}

	public async getMany(where?: where) {
		return await db
			.getRepository('moderated_instance')
			.find({ where: where });
	}

	public async delete(where: where) {
		return await db.getRepository('moderated_instance').delete(where);
	}

	public async allowAccept(host: string) {
		const instance = await this.get({
			host: punycode.toASCII(reduceSubdomain(host))
		});

		if (instance && !instance.accept) return false;
		return true;
	}

	public async allowDeliver(host: string) {
		const instance = await this.get({
			host: punycode.toASCII(reduceSubdomain(host))
		});

		if (instance && !instance.deliver) return false;
		return true;
	}

	public async allowFetch(host: string) {
		const instance = await this.get({
			host: punycode.toASCII(reduceSubdomain(host))
		});

		if (instance && !instance.fetch) return false;
		return true;
	}

	public async allowReturn(host: string) {
		const instance = await this.get({
			host: punycode.toASCII(reduceSubdomain(host))
		});

		if (instance && !instance.return) return false;
		return true;
	}

	private async alertBrokenRelationships(host: string) {
		/*
		 *	how can this be done?
		 *	hosts are reduced, but arent on relationship.user.host
		 *
		 * 1: bad
		 * return every follow/follower
		 * for loop over both arrays and do if (host.includes(follow.user.host))
		 * this will get everyone, but looping over every follow/follower
		 * on every single instance moderation action for every user would be a Lot
		 *
		 * 2: worse
		 * RelationshipService.getFollowers where host Like(host)
		 * this would be very bad and cause false positives.
		 *
		 * 3: decent
		 * postgres function that reduces the host like the moderated instance service
		 * does. look into how to do that with typeorm because that is probably the ideal
		 * way to do it.
		 *
		 * also! this should not be one notification for each relationship. flooding
		 * notifications would be really annoying
		 */
		return;
	}

	public async update(
		host: string,
		cw: string,
		sensitive: boolean,
		deliver: boolean,
		accept: boolean,
		fetch: boolean,
		return_: boolean
	) {
		const existing = await this.get({
			host: host
		});

		if (existing) {
			return await db
				.getRepository('moderated_instance')
				.update(
					{
						host: host
					},
					{
						cw: cw,
						sensitive: sensitive,
						deliver: deliver,
						accept: accept,
						fetch: fetch,
						return: return_
					}
				)
				.then(async () => {
					return {
						error: false,
						status: 200,
						instance: await this.get({ host: host })
					};
				})
				.catch(() => {
					return {
						error: true,
						status: 500
					};
				});
		} else {
			const moderatedInstance = {
				id: IdService.generate(),
				host: punycode.toASCII(reduceSubdomain(host)),
				cw: cw,
				sensitive: sensitive,
				deliver: deliver,
				accept: accept,
				fetch: fetch,
				return: return_
			};

			if (!deliver || !accept || !fetch || !return_)
				this.alertBrokenRelationships(host);

			return await db
				.getRepository('moderated_instance')
				.insert(moderatedInstance)
				.then(() => {
					return {
						error: false,
						status: 200,
						instance: moderatedInstance
					};
				})
				.catch(() => {
					return {
						error: true,
						status: 500
					};
				});
		}
	}
}

export default new ModeratedInstanceService();
