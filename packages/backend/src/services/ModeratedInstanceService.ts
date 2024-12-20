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

	private async alertBrokenRelationships(host: string) {
		/*
		 *	how can this be done?
		 *	hosts are reduced, but arent on relationship.user.host
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
