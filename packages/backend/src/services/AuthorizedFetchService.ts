import config from '../utils/config.js';
import locale from '../utils/locale.js';
import ApValidationService from './ap/ApValidationService.js';

export default async function (req, res, next) {
	const apvs = await ApValidationService.validSignature(req);

	if (config.authorizedFetch) {
		if (apvs.blocked)
			return res.status(403).json({ message: locale.error.hostBlocked });
		if (!apvs.valid)
			return res.status(401).json({ message: locale.error.invalidSignature });
		if (apvs.valid) next();
	} else {
		if (apvs.blocked)
			return res.status(403).json({ message: locale.error.hostBlocked });
		if (!apvs.valid) next();
		if (apvs.valid) next();
	}
}
