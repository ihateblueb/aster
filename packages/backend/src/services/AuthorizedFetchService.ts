import { ObjectLiteral } from 'typeorm';

import config from '../utils/config.js';
import locale from '../utils/locale.js';
import ApValidationService from './ap/ApValidationService.js';
import VisibilityService from './VisibilityService.js';

class AuthorizedFetchService {
	public async try(req, note?: ObjectLiteral) {
		const apvs = await ApValidationService.validSignature(req);

		console.log(req.url + ' hit afs');

		if (config.authorizedFetch) {
			if (apvs.blocked)
				return {
					error: true,
					status: 403,
					message: locale.error.hostBlocked
				};
			if (!apvs.valid)
				return {
					error: true,
					status: 401,
					message: locale.error.invalidSignature
				};
		} else {
			if (apvs.blocked)
				return {
					error: true,
					status: 403,
					message: locale.error.hostBlocked
				};
			if (!apvs.valid)
				return {
					error: false
				};
		}

		if (apvs.valid && note) {
			if (!apvs.user)
				return {
					error: true,
					status: 401,
					message: locale.error.invalidSignature
				};

			if (await VisibilityService.canISee(note, apvs.user))
				return {
					error: false
				};

			return {
				error: true,
				status: 404,
				message: locale.error.notFound
			};
		}

		if (apvs.valid)
			return {
				error: false
			};
	}
}

export default new AuthorizedFetchService();
