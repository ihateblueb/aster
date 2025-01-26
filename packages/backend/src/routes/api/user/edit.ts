import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ApActorRenderer from '../../../services/ap/ApActorRenderer.js';
import ApDeliverService from '../../../services/ap/ApDeliverService.js';
import ApUpdateRenderer from '../../../services/ap/ApUpdateRenderer.js';
import UserBuilder from '../../../services/builders/UserBuilder.js';
import ConfigService from '../../../services/ConfigService.js';
import SanitizerService from '../../../services/SanitizerService.js';
import UserService from '../../../services/UserService.js';
import ValidationService from '../../../services/ValidationService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['User'],
		params: {
			type: 'object',
			properties: {
				id: { type: 'string', nullable: true }
			}
		},
		body: {
			type: 'object',
			properties: {
				username: { type: 'string', nullable: true },
				displayName: { type: 'string', nullable: true },
				locked: { type: 'boolean', nullable: true },
				indexable: { type: 'boolean', nullable: true },
				automated: { type: 'boolean', nullable: true },
				sensitive: { type: 'boolean', nullable: true },
				bio: { type: 'string', nullable: true },
				pronouns: { type: 'string', nullable: true },
				location: { type: 'string', nullable: true },
				birthday: { type: 'string', nullable: true },
				isCat: { type: 'boolean', nullable: true },
				speakAsCat: { type: 'boolean', nullable: true },
				avatar: { type: 'string', nullable: true },
				avatarAlt: { type: 'string', nullable: true },
				banner: { type: 'string', nullable: true },
				bannerAlt: { type: 'string', nullable: true },
				admin: { type: 'boolean', nullable: true }
			}
		}
	} as const;

	fastify.patch<{
		Params: FromSchema<typeof schema.params>;
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/user/:id',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			const user = await UserService.get({
				id: req.params.id ?? req.auth.user.id
			});

			if (!user)
				return reply.status(404).send({
					message: 'Not found'
				});

			if (user.id !== req.auth.user.id && !req.auth.user.admin)
				return reply.status(403).send();

			let updated = {};

			/*
			* if (
				req.body.username &&
				req.body.username.length <= ConfigService.limits.soft.username
			)
				updated['username'] = SanitizerService.sanitize(
					req.body.username
				);*/

			if (
				req.body.displayName &&
				req.body.displayName.length <=
					ConfigService.limits.soft.displayName
			)
				updated['displayName'] = SanitizerService.sanitize(
					req.body.displayName
				);

			if ('locked' in req.body) {
				updated['locked'] = !!req.body.locked;
			}

			if ('indexable' in req.body) {
				updated['indexable'] = !!req.body.indexable;
			}

			if ('automated' in req.body) {
				updated['automated'] = !!req.body.automated;
			}

			if ('sensitive' in req.body) {
				updated['sensitive'] = !!req.body.sensitive;
			}

			if (
				req.body.bio &&
				req.body.bio.length <= ConfigService.limits.soft.bio
			)
				updated['bio'] = SanitizerService.sanitize(req.body.bio);

			if (
				req.body.pronouns &&
				req.body.pronouns.length <= ConfigService.limits.soft.pronouns
			)
				updated['pronouns'] = SanitizerService.sanitize(
					req.body.pronouns
				);

			if (
				req.body.location &&
				req.body.location.length <= ConfigService.limits.soft.location
			)
				updated['location'] = SanitizerService.sanitize(
					req.body.location
				);

			if (
				req.body.birthday &&
				ValidationService.validDate(req.body.birthday) &&
				req.body.birthday.length <= ConfigService.limits.soft.birthday
			)
				updated['birthday'] = SanitizerService.sanitize(
					new Date(req.body.birthday).toISOString()
				);

			if ('isCat' in req.body) {
				if (req.body.isCat) {
					updated['isCat'] = true;
				} else {
					updated['isCat'] = false;
				}
			}

			if ('speakAsCat' in req.body) {
				if (req.body.speakAsCat) {
					updated['speakAsCat'] = true;
				} else {
					updated['speakAsCat'] = false;
				}
			}

			if (
				req.body.avatar &&
				ValidationService.validUrl(req.body.avatar) &&
				req.body.avatar.length <= ConfigService.limits.hard.url
			)
				updated['avatar'] = SanitizerService.sanitize(req.body.avatar);

			if (
				req.body.avatarAlt &&
				req.body.avatarAlt.length <= ConfigService.limits.soft.alt
			)
				updated['avatarAlt'] = SanitizerService.sanitize(
					req.body.avatarAlt
				);

			if (
				req.body.banner &&
				ValidationService.validUrl(req.body.banner) &&
				req.body.banner.length <= ConfigService.limits.hard.url
			)
				updated['banner'] = SanitizerService.sanitize(req.body.banner);

			if (
				req.body.bannerAlt &&
				req.body.bannerAlt.length <= ConfigService.limits.soft.alt
			)
				updated['bannerAlt'] = SanitizerService.sanitize(
					req.body.bannerAlt
				);

			updated['updatedAt'] = new Date().toISOString();

			// todo: profile metadata. Yikes!

			if (req.auth.user.admin) {
				if ('admin' in req.body) {
					if (req.body.admin) {
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
			).then(async () => {
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

				return reply.status(200).send(await UserBuilder.build(newUser));
			});
		}
	);
});
