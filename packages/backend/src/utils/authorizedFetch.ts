import AuthorizedFetchService from '../services/AuthorizedFetchService.js';

export default async function (req, res, next) {
	const afs = await AuthorizedFetchService.try(req);

	if (afs.error)
		res.status(afs.status).json({
			message: afs.message
		});

	next();
}
