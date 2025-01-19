import express from 'express';

import ApActorRenderer from '../../../services/ap/ApActorRenderer.js';
import ApDeliverService from '../../../services/ap/ApDeliverService.js';
import ApUpdateRenderer from '../../../services/ap/ApUpdateRenderer.js';
import AuthService from '../../../services/AuthService.js';
import ConfigService from '../../../services/ConfigService.js';
import SanitizerService from '../../../services/SanitizerService.js';
import UserService from '../../../services/UserService.js';
import ValidationService from '../../../services/ValidationService.js';
import oapi from '../../../utils/apidoc.js';
import bodyparser from '../../../utils/bodyparser.js';

const router = express.Router();

router.patch(
	['/api/user', '/api/user/:id?'],
	oapi.path({
		description: 'Update a user',
		tags: ['User'],
		security: [{ auth: [] }],
		requestBody: {
			content: {
				'application/json': {
					type: 'object'
				}
			}
		},
		responses: {
			200: {
				description: 'Return an updated user.',
				content: {
					'application/json': {}
				}
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			413: { $ref: '#/components/responses/error-413' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	bodyparser,
	async (req, res) => {
		const auth = await AuthService.verify(req.headers.authorization);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		const bodyValidation = ValidationService.validateApiBody(req.body);

		if (bodyValidation.error)
			return res.status(bodyValidation.status).json({
				message: bodyValidation.message
			});

		const parsedBody = bodyValidation.body;

		const user = await UserService.get({
			id: req.params.id ?? auth.user.id
		});

		if (!user)
			return res.status(404).json({
				message: 'Not found'
			});

		if (user.id !== auth.user.id && !auth.user.admin)
			return res
				.status(403)
				.json({ message: 'You cannot edit this user' });

		let updated = {};

		if (
			parsedBody.username &&
			parsedBody.username.length <= ConfigService.limits.soft.username
		)
			updated['username'] = SanitizerService.sanitize(
				parsedBody.username
			);

		if (
			parsedBody.displayName &&
			parsedBody.displayName.length <=
				ConfigService.limits.soft.displayName
		)
			updated['displayName'] = SanitizerService.sanitize(
				parsedBody.displayName
			);

		if ('locked' in parsedBody) {
			if (parsedBody.locked) {
				updated['locked'] = true;
			} else {
				updated['locked'] = false;
			}
		}

		if ('indexable' in parsedBody) {
			if (parsedBody.indexable) {
				updated['indexable'] = true;
			} else {
				updated['indexable'] = false;
			}
		}

		if ('automated' in parsedBody) {
			if (parsedBody.automated) {
				updated['automated'] = true;
			} else {
				updated['automated'] = false;
			}
		}

		if ('sensitive' in parsedBody) {
			if (parsedBody.sensitive) {
				updated['sensitive'] = true;
			} else {
				updated['sensitive'] = false;
			}
		}

		if (
			parsedBody.bio &&
			parsedBody.bio.length <= ConfigService.limits.soft.bio
		)
			updated['bio'] = SanitizerService.sanitize(parsedBody.bio);

		if (
			parsedBody.location &&
			parsedBody.location.length <= ConfigService.limits.soft.location
		)
			updated['location'] = SanitizerService.sanitize(
				parsedBody.location
			);

		if (
			parsedBody.birthday &&
			ValidationService.validDate(parsedBody.birthday) &&
			parsedBody.birthday.length <= ConfigService.limits.soft.birthday
		)
			updated['birthday'] = SanitizerService.sanitize(
				new Date(parsedBody.birthday).toISOString()
			);

		if ('isCat' in parsedBody) {
			if (parsedBody.isCat) {
				updated['isCat'] = true;
			} else {
				updated['isCat'] = false;
			}
		}

		if ('speakAsCat' in parsedBody) {
			if (parsedBody.speakAsCat) {
				updated['speakAsCat'] = true;
			} else {
				updated['speakAsCat'] = false;
			}
		}

		if (
			parsedBody.avatar &&
			ValidationService.validUrl(parsedBody.avatar) &&
			parsedBody.avatar.length <= ConfigService.limits.hard.url
		)
			updated['avatar'] = SanitizerService.sanitize(parsedBody.avatar);

		if (
			parsedBody.avatarAlt &&
			parsedBody.avatarAlt.length <= ConfigService.limits.soft.alt
		)
			updated['avatarAlt'] = SanitizerService.sanitize(
				parsedBody.avatarAlt
			);

		if (
			parsedBody.banner &&
			ValidationService.validUrl(parsedBody.banner) &&
			parsedBody.banner.length <= ConfigService.limits.hard.url
		)
			updated['banner'] = SanitizerService.sanitize(parsedBody.banner);

		if (
			parsedBody.bannerAlt &&
			parsedBody.bannerAlt.length <= ConfigService.limits.soft.alt
		)
			updated['bannerAlt'] = SanitizerService.sanitize(
				parsedBody.bannerAlt
			);

		updated['updatedAt'] = new Date().toISOString();

		// todo: profile metadata. Yikes!

		if (auth.user.admin) {
			if ('admin' in parsedBody) {
				if (parsedBody.admin) {
					updated['admin'] = true;
				} else {
					updated['admin'] = false;
				}
			}
		}

		return await UserService.update(
			{
				id: user.id
			},
			updated
		)
			.then(async () => {
				const newUser = await UserService.get({ id: user.id });

				if (user.local) {
					let activity = ApUpdateRenderer.render(
						ApActorRenderer.render(newUser)
					);

					await ApDeliverService.deliverToFollowers(
						activity,
						user.id
					);
				}

				return res.status(200).send(newUser);
			})
			.catch(() => {
				return res
					.status(500)
					.send({ message: 'Internal server error' });
			});
	}
);

export default router;
