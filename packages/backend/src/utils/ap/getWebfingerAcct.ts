import { createHash, createSign } from 'node:crypto';
import axios from 'axios';

import pkg from '../../../../../package.json' assert { type: 'json' };
import config from '../config.js';
import db from '../database.js';
import logger from '../logger.js';

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
				logger('debug', 'webfinger', JSON.stringify(res.data));
				const apIdFromWebfinger = await res.data.links.find(
					(e) => e.rel === 'self'
				).href;
				logger('debug', 'webfinger', 'got ' + apIdFromWebfinger);
				return apIdFromWebfinger;
			})
			.catch((e) => {
				logger('error', 'webfinger', e);
			});
	}
}
