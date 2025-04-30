import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import { In, IsNull } from 'typeorm';

import ApActorRenderer from '../../../services/ap/renderers/ApActorRenderer.js';
import ApDeliverService from '../../../services/ap/ApDeliverService.js';
import ApUpdateRenderer from '../../../services/ap/renderers/ApUpdateRenderer.js';
import CacheService from '../../../services/CacheService.js';
import ConfigService from '../../../services/ConfigService.js';
import EmojiService from '../../../services/EmojiService.js';
import MfmService from '../../../services/MfmService.js';
import SanitizerService from '../../../services/SanitizerService.js';
import UserRenderer from '../../../services/UserRenderer.js';
import UserService from '../../../services/UserService.js';
import ValidationService from '../../../services/ValidationService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['User'],
		params: {
			type: 'object',
			properties: {
				id: { type: ['string', 'null'] }
			}
		},
		body: {
			type: 'object',
			properties: {
				displayName: {
					type: ['string', 'null'],
					maxLength: ConfigService.limits.soft.displayName
				},
				locked: { type: ['boolean', 'null'] },
				indexable: { type: ['boolean', 'null'] },
				automated: { type: ['boolean', 'null'] },
				sensitive: { type: ['boolean', 'null'] },
				bio: {
					type: ['string', 'null'],
					maxLength: ConfigService.limits.soft.bio
				},
				location: {
					type: ['string', 'null'],
					maxLength: ConfigService.limits.soft.location
				},
				birthday: {
					type: ['string', 'null'],
					maxLength: ConfigService.limits.soft.birthday
				},
				isCat: { type: ['boolean', 'null'] },
				speakAsCat: { type: ['boolean', 'null'] },
				avatar: {
					type: ['string', 'null'],
					maxLength: ConfigService.limits.hard.url
				},
				avatarAlt: {
					type: ['string', 'null'],
					maxLength: ConfigService.limits.soft.alt
				},
				banner: {
					type: ['string', 'null'],
					maxLength: ConfigService.limits.hard.url
				},
				bannerAlt: {
					type: ['string', 'null'],
					maxLength: ConfigService.limits.soft.alt
				},
				admin: { type: ['boolean', 'null'] }
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

			if (!user) return reply.status(404).send();

			if (user.id !== req.auth.user.id && !req.auth.user.admin)
				return reply.status(403).send();

			let updated = {};

			/*
			* Potential problems with Mastodon
			* if (
				req.body.username &&
				req.body.username.length <= ConfigService.limits.soft.username
			)
				updated['username'] = SanitizerService.sanitize(
					req.body.username
				);*/

			if ('displayName' in req.body) {
				if (req.body.displayName) {
					updated['displayName'] = SanitizerService.sanitize(
						req.body.displayName
					);
				} else {
					updated['displayName'] = null;
				}
			}

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

			if ('bio' in req.body) {
				if (req.body.bio) {
					updated['bio'] = SanitizerService.sanitize(req.body.bio);
				} else {
					updated['bio'] = null;
				}
			}

			if ('location' in req.body) {
				if (req.body.location) {
					updated['location'] = SanitizerService.sanitize(
						req.body.location
					);
				} else {
					updated['location'] = null;
				}
			}

			if ('birthday' in req.body) {
				if (req.body.birthday) {
					if (ValidationService.validDate(req.body.birthday)) {
						updated['birthday'] = SanitizerService.sanitize(
							req.body.birthday
						);
					} else {
						return reply.status(400).send({
							message: 'Birthday is invalid'
						});
					}
				} else {
					updated['birthday'] = null;
				}
			}

			if ('isCat' in req.body) {
				updated['isCat'] = !!req.body.isCat;
			}

			if ('speakAsCat' in req.body) {
				updated['speakAsCat'] = !!req.body.speakAsCat;
			}

			if ('avatar' in req.body) {
				if (req.body.avatar) {
					if (ValidationService.validUrl(req.body.avatar)) {
						updated['avatar'] = SanitizerService.sanitize(
							req.body.avatar
						);
					} else {
						return reply.status(400).send({
							message: 'avatar url is invalid'
						});
					}
				} else {
					updated['avatar'] = null;
				}
			}

			if ('avatarAlt' in req.body) {
				if (req.body.avatarAlt) {
					updated['avatarAlt'] = SanitizerService.sanitize(
						req.body.avatarAlt
					);
				} else {
					updated['avatarAlt'] = null;
				}
			}

			if ('banner' in req.body) {
				if (req.body.banner) {
					if (ValidationService.validUrl(req.body.banner)) {
						updated['banner'] = SanitizerService.sanitize(
							req.body.banner
						);
					} else {
						return reply.status(400).send({
							message: 'banner url is invalid'
						});
					}
				} else {
					updated['banner'] = null;
				}
			}

			if ('bannerAlt' in req.body) {
				if (req.body.bannerAlt) {
					updated['bannerAlt'] = SanitizerService.sanitize(
						req.body.bannerAlt
					);
				} else {
					updated['bannerAlt'] = null;
				}
			}

			updated['updatedAt'] = new Date().toISOString();

			// todo: profile metadata. Yikes!

			if (req.auth.user.admin) {
				if ('admin' in req.body) {
					updated['admin'] = !!req.body.admin;
				}
			}

			if (user.local) {
				let emojis: any[] = [];
				if (user.displayName)
					emojis.concat(MfmService.extractEmojis(user.displayName));
				if (user.bio) emojis.concat(MfmService.extractEmojis(user.bio));

				let foundEmojis = await EmojiService.getMany({
					shortcode: In(emojis),
					host: IsNull()
				});

				updated['emojis'] = foundEmojis.map((emoji) => emoji.id);
			}

			return await UserService.update(
				{
					id: user.id
				},
				updated
			).then(async () => {
				const newUser = await UserService.get({ id: user.id });

				await CacheService.scanAndDel('user*' + user.id);

				if (user.local) {
					let activity = ApUpdateRenderer.render(
						ApActorRenderer.render(newUser)
					);

					await ApDeliverService.deliverToFollowers(
						activity,
						user.id
					);
				}

				return reply
					.status(200)
					.send(await UserRenderer.render(newUser));
			});
		}
	);
});
