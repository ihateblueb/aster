import logger from '../utils/logger.js';
import ApActorService from './ap/ApActorService.js';
import ApResolver from './ap/ApResolver.js';

class WebfingerService {
	// todo: finish
	public async lookup(handle: string) {
		// @user@example.com
		const splitHandle = handle.split('@');
		const url = `https://${splitHandle[2]}/.well-known/webfinger?resource=acct:${splitHandle[1]}@${splitHandle[2]}`;

		logger.debug('webfinger', 'looking up ' + url);

		const res = await ApResolver.resolve(url, 'application/jrd+json');

		if (!res || !res.links) return false;

		const found = res.links.find(
			(e) =>
				e.rel === 'self' &&
				(e.type === 'application/activity+json' ||
					e.type === 'application/ld+json')
		);
		const foundHref = found?.href;

		if (foundHref) return await ApActorService.get(foundHref);
		return false;
	}
}

export default new WebfingerService();
