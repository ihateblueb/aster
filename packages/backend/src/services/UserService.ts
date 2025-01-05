import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import db from '../utils/database.js';
import locale from '../utils/locale.js';
import logger from '../utils/logger.js';
import ApFollowRenderer from './ap/ApFollowRenderer.js';
import ConfigService from './ConfigService.js';
import IdService from './IdService.js';
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

	public async delete(where: where) {
		return await db.getRepository('user').delete(where);
	}

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
					.then(() => {
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
							message: 'Failed to remove follow'
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

			follow['pending'] = !to.locked;

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
						message: 'Failed to add follow'
					};
				});
		}
	}

	public async register(
		username: string,
		password: string,
		approval?: boolean,
		invite?: string
	) {
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
					message: locale.user.failedCreate
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
					message: locale.user.failedCreatePrivate
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
}

export default new UserService();
