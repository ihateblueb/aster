import AuthService from '../services/AuthService.js';

export default async function (req, res, next) {
	const auth = await AuthService.verify(
		req.headers.authorization ?? req.cookie.as_token
	);

	if (auth.error)
		return res.status(auth.status).json({
			message: auth.message
		});

	res.locals.asAuth = auth;

	next();
}
