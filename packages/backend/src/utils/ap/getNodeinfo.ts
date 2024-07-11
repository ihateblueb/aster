import axios from 'axios';

import pkg from '../../../../../package.json' with { type: 'json' };
import logger from '../logger.js';
import isValidUrl from '../isValidUrl.js';

export default async function getNodeinfo(host) {
	if (host) {
		if (isValidUrl(host)) {
			return await axios
				.get('https://' + host + '/.well-known/nodeinfo', {
					headers: {
						'Content-Type': 'application/jrd+json',
						'User-Agent': `Aster/${pkg.version}`,
						Accept: 'application/jrd+json'
					}
				})
				.then(async (res) => {
					logger('debug', 'nodeinfo', JSON.stringify(res.data));
					const nodeinfo = await res.data.links.find(
						(e) =>
							e.rel ===
							'http://nodeinfo.diaspora.software/ns/schema/2.0'
					).href;
					logger('debug', 'nodeinfo', 'got ' + nodeinfo);
					return nodeinfo;
				})
				.catch((e) => {
					logger('error', 'nodeinfo', e);
				});
		}
		return false;
	}
}
