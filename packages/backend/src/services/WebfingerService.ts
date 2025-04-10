import logger from '../utils/logger.js';
import ApResolver from './ap/ApResolver.js';

class WebfingerService {
    // todo: finish
	public async lookup(handle: string) {
		// @user@example.com
		const splitHandle = handle.split('@');

		logger.debug(
			'webfinger',
			'splitHandle 0: ' + splitHandle[0] + ' 1: ' + splitHandle[1]
		);

		const url = `https://${splitHandle[1]}/.well-known/webfinger?resource=acct:@${splitHandle[0]}`;

		const res = await ApResolver.resolve(url, 'application/jrd+json');

		if (!res || !res.links) return false;

		const found = res.links.find(
			(e) =>
				e.rel === 'self' &&
				(e.type === 'application/activity+json' ||
					e.type === 'application/ld+json')
		);

        console.log(found)
	}
}

export default new WebfingerService();
