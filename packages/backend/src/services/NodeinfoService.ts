import MetaService from './MetaService.js';

class NodeinfoService {
	public async render(version: '2.0' | '2.1') {
		const meta = await MetaService.get();

		return {
			version: version,
			software: {
				name: meta.software,
				version: meta.version
			},
			protocols: ['activitypub'],
			openRegistrations: Boolean(meta.registrations === 'open'),
			usage: {
				users: {
					total: meta.stats.user
				},
				localPosts: meta.stats.note
			}
		};
	}
}

export default new NodeinfoService();
