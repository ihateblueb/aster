import axios from 'axios';

import pkg from '../../../../../package.json' with { type: 'json' };
import Logger from '../logger.js';

export default async function getWebfingerAcct(user, host) {
	if (user && host) {
		return await axios
			.get(
				'https://' +
					host +
					'/.well-known/webfinger?resource=acct:' +
					user +
					'@' +
					host,
				{
					headers: {
						'Content-Type': 'application/jrd+json',
						'User-Agent': `Aster/${pkg.version}`,
						Accept: 'application/jrd+json'
					}
				}
			)
			.then(async (res) => {
				Logger.debug('webfinger', JSON.stringify(res.data));
				const apIdFromWebfinger = await res.data.links.find(
					(e) => e.rel === 'self'
				).href;
				Logger.debug('webfinger', 'got ' + apIdFromWebfinger);
				return apIdFromWebfinger;
			})
			.catch((e) => {
				Logger.error('webfinger', e);
				return false;
			});
	}
}
