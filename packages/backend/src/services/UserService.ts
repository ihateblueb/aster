import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import config from '../utils/config.js';
import db from '../utils/database.js';
import locale from '../utils/locale.js';
import IdService from './IdService.js';

class UserService {
	public async get(where: where) {
		return await db.getRepository('user').findOne({ where: where });
	}

	public async getPrivate(where: where) {
		return await db.getRepository('user_private').findOne({ where: where });
	}

	public async delete(where: where) {
		return await db.getRepository('user').delete(where);
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

		if (username.length > config.limits.soft.username)
			return {
				error: true,
				status: 400,
				message: locale.user.registration.usernameTooLong
			};

		if (password.length > config.limits.soft.password)
			return {
				error: true,
				status: 400,
				message: locale.user.registration.passwordTooLong
			};

		const instanceUrl = new URL(config.url);

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

		await db
			.getRepository('user')
			.insert(user)
			.catch(() => {
				return {
					error: true,
					status: 500,
					message: locale.user.failedCreate
				};
			});

		await db
			.getRepository('user_private')
			.insert(userPrivate)
			.catch(() => {
				return {
					error: true,
					status: 500,
					message: locale.user.failedCreatePrivate
				};
			});

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
