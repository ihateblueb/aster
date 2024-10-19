import pkg from '../../../../../package.json' with { type: 'json' };
import logger from '../../utils/logger.js';
import UserService from '../UserService.js';

class ApResolver {
	public async resolve(url: string | URL, as?: string) {
		let actor;

		if (as) {
			actor = await UserService.get({ id: as });
		} else {
			// todo: instance actor setup
			actor = await UserService.get({ username: 'instanceactor' });
		}

		await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/activity+json, application/ls+json; ', //todo: add that one link
				'User-Agent': `${pkg.name}/${pkg.version}`
				// todo: signing
			}
		})
			.then((e) => {
				console.log(e);
				logger.debug(
					'resolver',
					'resolved ' + url + ' as @' + actor.username
				);
				return e;
			})
			.catch((err) => {
				console.log(err);
				logger.error(
					'resolver',
					'failed to resolve ' + url + ' as @' + actor.username
				);
			});
	}
}

export default new ApResolver();
