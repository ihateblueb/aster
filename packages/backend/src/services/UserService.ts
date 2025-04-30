import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { ObjectLiteral } from 'typeorm';

import db from '../utils/database.js';
import locale from '../utils/locale.js';
import logger from '../utils/logger.js';
import ApBiteRenderer from './ap/renderers/ApBiteRenderer.js';
import ApBlockRenderer from './ap/renderers/ApBlockRenderer.js';
import ApFollowRenderer from './ap/renderers/ApFollowRenderer.js';
import ApUndoRenderer from './ap/renderers/ApUndoRenderer.js';
import ConfigService from './ConfigService.js';
import IdService from './IdService.js';
import NotificationService from './NotificationService.js';
import QueueService from './QueueService.js';
import RelationshipService from './RelationshipService.js';

class UserService {
	public async get(where: where) {
		return await db.getRepository('user').findOne({ where: where });
	}

	public async getMany(where: where) {
		return await db.getRepository('user').find({ where: where });
	}

	public async getPrivate(where: where) {
		return await db.getRepository('user_private').findOne({ where: where });
	}

	public async getPrivateMany(where: where) {
		return await db.getRepository('user_private').find({ where: where });
	}

	public async getFull(where: where) {
		let user = await this.get(where);
		return [user, await this.getPrivate({ user: user.id })];
	}

	public async update(where: where, entity: Partial<ObjectLiteral>) {
		return await db.getRepository('user').update(where, entity);
	}

	public async delete(where: where) {
		return await db.getRepository('user').delete(where);
	}

	/* todo: this.follow & this.block, is this how this should be done? could this be made less complicated? could this be moved elsewhere? */

	public async follow(user: GenericId, as: GenericId, toggle?: boolean) {
		const id = IdService.generate();

		const to = await this.get({ id: user });
		const from = await this.get({ id: as });

		if (!to || !from) {
			return {
				status: 404,
				message: 'User not found'
			};
		}

		if (to.id === from.id) {
			return {
				status: 400,
				message: "You can't follow yourself"
			};
		}

		const existingFollow = await RelationshipService.get({
			to: { id: user },
			from: { id: from.id },
			type: 'follow'
		});

		if (existingFollow) {
			if (toggle) {
				return RelationshipService.delete({
					id: existingFollow.id
				})
					.then(async () => {
						if (!to.local) {
							const activity = ApUndoRenderer.render(
								ApFollowRenderer.render(id, from.id, to.apId)
							);

							await QueueService.deliver.add(
								IdService.generate(),
								{
									as: from.id,
									inbox: to.inbox,
									body: activity
								}
							);
						}

						return {
							status: 200,
							message: 'Removed follow'
						};
					})
					.catch((err) => {
						console.error(err);
						logger.error('user', 'follow delete failed');
						return {
							status: 500,
							message: 'Internal server error'
						};
					});
			} else {
				return {
					status: 409,
					message: 'Follow already exists'
				};
			}
		} else {
			const follow = {
				id: id,
				toId: user,
				fromId: as,
				type: 'follow',
				createdAt: new Date().toISOString()
			};

			follow['pending'] = to.locked;

			if (!to.local) {
				const activity = ApFollowRenderer.render(id, from.id, to.apId);

				await QueueService.deliver.add(IdService.generate(), {
					as: from.id,
					inbox: to.inbox,
					body: activity
				});
			}

			return await db
				.getRepository('relationship')
				.insert(follow)
				.then(() => {
					return {
						status: 200,
						message: 'Added follow'
					};
				})
				.catch((err) => {
					console.error(err);
					logger.error('user', 'follow failed');
					return {
						status: 500,
						message: 'Internal server error'
					};
				});
		}
	}

	public async block(user: GenericId, as: GenericId, toggle?: boolean) {
		const id = IdService.generate();

		const to = await this.get({ id: user });
		const from = await this.get({ id: as });

		if (!to || !from) {
			return {
				status: 404,
				message: 'User not found'
			};
		}

		if (to.id === from.id) {
			return {
				status: 400,
				message: "You can't block yourself"
			};
		}

		const existingBlock = await RelationshipService.get({
			to: { id: user },
			from: { id: from.id },
			type: 'block'
		});

		if (existingBlock) {
			if (toggle) {
				return RelationshipService.delete({
					id: existingBlock.id
				})
					.then(() => {
						return {
							status: 200,
							message: 'Removed block'
						};
					})
					.catch((err) => {
						console.error(err);
						logger.error('user', 'block delete failed');
						return {
							status: 500,
							message: 'Internal server error'
						};
					});
			} else {
				return {
					status: 409,
					message: 'Block already exists'
				};
			}
		} else {
			const block = {
				id: id,
				toId: user,
				fromId: as,
				type: 'block',
				createdAt: new Date().toISOString()
			};

			if (!to.local) {
				const activity = ApBlockRenderer.render(id, from.id, to.apId);

				await QueueService.deliver.add(IdService.generate(), {
					as: from.id,
					inbox: to.inbox,
					body: activity
				});
			}

			return await db
				.getRepository('relationship')
				.insert(block)
				.then(() => {
					return {
						status: 200,
						message: 'Added block'
					};
				})
				.catch((err) => {
					console.error(err);
					logger.error('user', 'block failed');
					return {
						status: 500,
						message: 'Internal server error'
					};
				});
		}
	}

	public async bite(user: GenericId, as: GenericId) {
		const to = await this.get({ id: user });
		const from = await this.get({ id: as });

		if (!to || !from) {
			return {
				status: 404,
				message: 'User not found'
			};
		}

		if (to.id === from.id) {
			return {
				status: 400,
				message: "You can't bite yourself"
			};
		}

		if (to.local) {
			return await NotificationService.create(
				to.id,
				from.id,
				'bite'
			).then(() => {
				return {
					status: 200,
					message: 'Bit user'
				};
			});
		} else {
			let activity = ApBiteRenderer.render(from.id, to.apId);

			await QueueService.deliver.add(IdService.generate(), {
				body: activity,
				inbox: to.inbox,
				as: from.id
			});

			return {
				status: 200,
				message: 'Bit user'
			};
		}
	}

	public async register(
		username: string,
		password: string,
		approval?: boolean,
		invite?: string
	) {
		// todo: check if username is available

		if (username.length <= 0)
			return {
				error: true,
				status: 400,
				message: locale.user.registration.usernameTooShort
			};

		if (password.length <= 6)
			return {
				error: true,
				status: 400,
				message: locale.user.registration.passwordTooShort
			};

		if (username.length > ConfigService.limits.soft.username)
			return {
				error: true,
				status: 400,
				message: locale.user.registration.usernameTooLong
			};

		if (password.length > ConfigService.limits.soft.password)
			return {
				error: true,
				status: 400,
				message: locale.user.registration.passwordTooLong
			};

		const instanceUrl = ConfigService.url;

		const id = IdService.generate();
		const privateId = IdService.generate();

		if (invite) {
			const grabbedInvite = await db.getRepository('invite').findOne({
				where: {
					invite: invite
				}
			});

			if (grabbedInvite) {
				if (!grabbedInvite.usedBy) {
					await db.getRepository('invite').update(
						{
							where: {
								id: grabbedInvite.id
							}
						},
						{
							usedBy: id
						}
					);
				} else {
					return {
						error: true,
						status: 400,
						message: locale.user.registration.inviteAlreadyUsed
					};
				}
			} else {
				return {
					error: true,
					status: 400,
					message: locale.user.registration.inviteDoesntExist
				};
			}
		}

		const salt = bcrypt.genSaltSync(12);
		const hash = bcrypt.hashSync(password, salt);

		const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
			modulusLength: 2048,
			publicKeyEncoding: {
				type: 'spki',
				format: 'pem'
			},
			privateKeyEncoding: {
				type: 'pkcs8',
				format: 'pem'
			}
		});

		const user = {
			id: id,
			apId: instanceUrl.href + 'users/' + id,
			inbox: instanceUrl.href + 'users/' + id + '/inbox',
			outbox: instanceUrl.href + 'users/' + id + '/outbox',
			username: username,
			host: instanceUrl.host,
			local: true,
			activated: !approval,
			createdAt: new Date().toISOString(),
			followingUrl: instanceUrl.href + 'users/' + id + '/following',
			followersUrl: instanceUrl.href + 'users/' + id + '/followers',
			publicKey: publicKey
		};

		const userPrivate = {
			id: privateId,
			user: id,
			password: hash,
			privateKey: privateKey
		};

		const existingUser = await db.getRepository('user').find({
			where: {
				username: username
			}
		});

		if (existingUser.length > 0)
			return {
				error: true,
				status: 400,
				message: locale.user.registration.usernameTaken
			};

		// uo and upo (user (private) output) returns errors if they are there.
		// forgot to do that before
		// yes, the then return undefined is necessary, otherwise it returns InsertResult whcih sucks

		const uo = await db
			.getRepository('user')
			.insert(user)
			.then(() => {
				return undefined;
			})
			.catch(() => {
				return {
					error: true,
					status: 500,
					message: 'Internal server error'
				};
			});

		if (uo && uo.error) return uo;

		const upo = await db
			.getRepository('user_private')
			.insert(userPrivate)
			.then(() => {
				return undefined;
			})
			.catch(() => {
				return {
					error: true,
					status: 500,
					message: 'Internal server error'
				};
			});

		if (upo && upo.error) return upo;

		return {
			error: false,
			status: 200,
			message: approval
				? locale.user.awaitingApproval
				: locale.user.created,
			user: user,
			userPrivate: userPrivate
		};
	}

	public async login(username: string, password: string) {
		const user = await db.getRepository('user').findOne({
			where: {
				username: username,
				local: true
			}
		});

		if (!user)
			return {
				error: true,
				status: 404,
				message: locale.user.notFound
			};

		const userPrivate = await db.getRepository('user_private').findOne({
			where: {
				user: user.id
			}
		});

		if (!userPrivate)
			return {
				error: true,
				status: 404,
				message: locale.user.privateNotFound
			};

		if (bcrypt.compareSync(password, userPrivate.password)) {
			return {
				error: false,
				status: 200,
				message: locale.auth.success,
				user: user
			};
		} else {
			return {
				error: true,
				status: 400,
				message: locale.user.incorrectPassword
			};
		}
	}

	public async resetPassword(username: string, newPassword: string) {
		return;
	}
}

export default new UserService();
