import db from '../database.js';
import logger from '../logger.js';
import Logger from '../logger.js';
import fromHtml from '../mfm/fromHtml.js';
import sanitize from '../sanitize.js';
import getSigned from './getSigned.js';

export default async function updateRemoteActor(body) {
	let grabbedUser = {};

	grabbedUser = await db
		.getRepository('user')
		.update(
			{ ap_id: body.id },
			{ updated_at: new Date(Date.now()).toISOString() }
		);

	grabbedUser = await db
		.getRepository('user')
		.update(
			{ ap_id: body.id },
			{ username: sanitize(body.preferredUsername) }
		);

	if (body.type === 'Service') {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { automated: true });
	}

	grabbedUser = await db
		.getRepository('user')
		.update({ ap_id: body.id }, { url: sanitize(body.url) });

	if (body.name) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { displayname: sanitize(body.name) });
	}

	if (body._misskey_summary) {
		grabbedUser = await db
			.getRepository('user')
			.update(
				{ ap_id: body.id },
				{ bio: sanitize(body._misskey_summary) }
			);
	} else if (body.summary) {
		grabbedUser = await db
			.getRepository('user')
			.update(
				{ ap_id: body.id },
				{ bio: sanitize(await fromHtml(body.summary)) }
			);
	}

	if (body.icon) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { avatar: sanitize(body.icon.url) });
	}

	if (body.image) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { banner: sanitize(body.image.url) });
	}

	if (body.backgroundUrl) {
		grabbedUser = await db
			.getRepository('user')
			.update(
				{ ap_id: body.id },
				{ background: sanitize(body.backgroundUrl) }
			);
	}

	if (body.manuallyApprovesFollowers) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { locked: true });
	} else if (!body.manuallyApprovesFollowers) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { locked: false });
	}

	if (body.backgroundUrl) {
		grabbedUser = await db
			.getRepository('user')
			.update(
				{ ap_id: body.id },
				{ background: sanitize(body.backgroundUrl) }
			);
	}

	if (body.suspended) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { suspended: true });
	} else if (!body.suspended) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { suspended: false });
	}

	if (body.discoverable) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { discoverable: true });
	} else if (!body.discoverable) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { discoverable: false });
	}

	if (body.isCat) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { is_cat: true });
	} else if (!body.isCat) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { is_cat: false });
	}

	if (body.speakAsCat) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { speak_as_cat: true });
	} else if (!body.speakAsCat) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { speak_as_cat: false });
	}

	if (body.following) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { following_url: body.following });

		try {
			let grabbedFollowing = await getSigned(body.following);

			if (grabbedFollowing.data) {
				if (grabbedFollowing.data.totalItems) {
					grabbedUser = await db.getRepository('user').update(
						{ ap_id: body.id },
						{
							total_following: grabbedFollowing.data.totalItems
						}
					);
				}
			}
		} catch (e) {
			logger.debug('ap', e);
		}
	}

	if (body.followers) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { followers_url: body.followers });

		try {
			let grabbedFollowers = await getSigned(body.followers);

			if (grabbedFollowers.data) {
				if (grabbedFollowers.data.totalItems) {
					grabbedUser = await db.getRepository('user').update(
						{ ap_id: body.id },
						{
							total_followers: grabbedFollowers.data.totalItems
						}
					);
				}
			}
		} catch (e) {
			logger.debug('ap', e);
		}
	}

	if (body['vcard:bday']) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { birthday: body['vcard:bday'] });
	}

	if (body['vcard:Address']) {
		grabbedUser = await db
			.getRepository('user')
			.update({ ap_id: body.id }, { location: body['vcard:Address'] });
	}

	console.log(grabbedUser);

	Logger.info('ap', 'updated remote actor ' + body.id);

	return grabbedUser;
}
