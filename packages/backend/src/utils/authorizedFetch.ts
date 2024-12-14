import AuthorizedFetchService from '../services/AuthorizedFetchService.js';

/*
 * Express middleware adapting the Authorized Fetch Service
 * to handle requests. This is so on generic AP endpoints
 * you can just throw `await authorizedFetch` before the
 * rest of the route code, and it'll pass through here.
 * Not all endpoints use it, like the note, because they
 * have extra checks for visibility. They still use the AFS,
 * though. Just with their own handling.
 * */
export default async function (req, res, next) {
	const afs = await AuthorizedFetchService.try(req);

	if (afs.error)
		res.status(afs.status).json({
			message: afs.message
		});

	next();
}
