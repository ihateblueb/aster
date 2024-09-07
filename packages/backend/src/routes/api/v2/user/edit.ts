import express from 'express';
import db from '../../../../utils/database.js';
import sanitize from '../../../../utils/sanitize.js';
import UserAuthService from '../../../../services/UserAuthService.js';

const router = express.Router();

router.patch(`/api/v2/user`, async (req, res) => {
	let authRes = await UserAuthService.verifyToken(req);

	if (authRes.status === 200) {
		let updatedUser = [];

		if (req.body) {
			if (
				'displayname' in JSON.parse(req.body) &&
				JSON.parse(req.body).displayname.length > 0
			) {
				updatedUser['displayname'] = sanitize(
					JSON.parse(req.body).displayname
				);
			}

			if (
				'locked' in JSON.parse(req.body) &&
				JSON.parse(req.body).locked.length > 0
			) {
				updatedUser['locked'] = Boolean(JSON.parse(req.body).locked);
			}

			if (
				'discoverable' in JSON.parse(req.body) &&
				JSON.parse(req.body).discoverable.length > 0
			) {
				updatedUser['discoverable'] = Boolean(
					JSON.parse(req.body).discoverable
				);
			}

			if (
				'indexable' in JSON.parse(req.body) &&
				JSON.parse(req.body).indexable.length > 0
			) {
				updatedUser['indexable'] = Boolean(
					JSON.parse(req.body).indexable
				);
			}

			if (
				'automated' in JSON.parse(req.body) &&
				JSON.parse(req.body).automated.length > 0
			) {
				updatedUser['automated'] = Boolean(
					JSON.parse(req.body).automated
				);
			}

			if (
				'avatar' in JSON.parse(req.body) &&
				JSON.parse(req.body).avatar.length > 0
			) {
				updatedUser['avatar'] = sanitize(JSON.parse(req.body).avatar);
			}

			if (
				'avatar_alt' in JSON.parse(req.body) &&
				JSON.parse(req.body).avatar_alt.length > 0
			) {
				updatedUser['avatar_alt'] = sanitize(
					JSON.parse(req.body).avatar_alt
				);
			}

			if (
				'banner' in JSON.parse(req.body) &&
				JSON.parse(req.body).banner.length > 0
			) {
				updatedUser['banner'] = sanitize(JSON.parse(req.body).banner);
			}

			if (
				'banner_alt' in JSON.parse(req.body) &&
				JSON.parse(req.body).banner_alt.length > 0
			) {
				updatedUser['banner_alt'] = sanitize(
					JSON.parse(req.body).banner_alt
				);
			}

			if (
				'background' in JSON.parse(req.body) &&
				JSON.parse(req.body).background.length > 0
			) {
				updatedUser['background'] = sanitize(
					JSON.parse(req.body).background
				);
			}

			if (
				'background_alt' in JSON.parse(req.body) &&
				JSON.parse(req.body).background_alt.length > 0
			) {
				updatedUser['background_alt'] = sanitize(
					JSON.parse(req.body).background_alt
				);
			}

			if (
				'bio' in JSON.parse(req.body) &&
				JSON.parse(req.body).bio.length > 0
			) {
				updatedUser['bio'] = sanitize(JSON.parse(req.body).bio);
			}

			if (
				'location' in JSON.parse(req.body) &&
				JSON.parse(req.body).location.length > 0
			) {
				updatedUser['location'] = sanitize(
					JSON.parse(req.body).location
				);
			}

			if (
				'birthday' in JSON.parse(req.body) &&
				JSON.parse(req.body).birthday.length > 0
			) {
				updatedUser['birthday'] = sanitize(
					JSON.parse(req.body).birthday
				);
			}

			if (
				'is_cat' in JSON.parse(req.body) &&
				JSON.parse(req.body).is_cat.length > 0
			) {
				updatedUser['is_cat'] = Boolean(JSON.parse(req.body).is_cat);
			}

			if (
				'speak_as_cat' in JSON.parse(req.body) &&
				JSON.parse(req.body).speak_as_cat.length > 0
			) {
				updatedUser['speak_as_cat'] = Boolean(
					JSON.parse(req.body).speak_as_cat
				);
			}

			if (
				'pinned_notes' in JSON.parse(req.body) &&
				JSON.parse(req.body).pinned_notes.length > 0
			) {
				updatedUser['pinned_notes'] = sanitize(
					JSON.parse(req.body).pinned_notes
				);
			}

			if (
				'metadata' in JSON.parse(req.body) &&
				JSON.parse(req.body).metadata.length > 0
			) {
				updatedUser['metadata'] = sanitize(
					JSON.parse(req.body).metadata
				);
			}

			await db
				.getRepository('user')
				.update({ id: authRes.grabbedUserAuth.user }, updatedUser);

			let grabbedUpdatedUser = await db.getRepository('user').findOne({
				where: {
					id: authRes.grabbedUserAuth.user
				}
			});

			return res.status(200).json({
				message: 'Updated user',
				user: grabbedUpdatedUser
			});
		}
		return res.status(400).json({
			message: 'Body required'
		});
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

export default router;
