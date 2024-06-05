import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

import config from '../../../utils/config.js';
import db from '../../../utils/database.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.get('/api/v1/note/:noteid', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.noteid) {
		return res.status(400).json({
			message: 'Note ID parameter required'
		});
	} else {
		var grabbedNote = await db.getRepository('notes').findOne({
			where: {
				id: req.params.noteid
			}
		});

		if (grabbedNote) {
			var grabbedAuthor = await db.getRepository('users').findOne({
				where: {
					id: grabbedNote.author
				}
			});

			if (grabbedAuthor) {
				if (grabbedAuthor.suspended) {
					return res.status(400).json({
						message: 'Note author suspended'
					});
				} else if (grabbedAuthor.deactivated) {
					return res.status(400).json({
						message: 'Note author deactivated'
					});
				} else {
					// good to go :3
					var noteJson = {
						author: {}
					};

					noteJson['id'] = grabbedNote.id;
					noteJson['local'] = grabbedNote.local;

					noteJson.author['id'] = grabbedAuthor.id;
					noteJson.author['username'] = grabbedAuthor.username;
					noteJson.author['local'] = grabbedAuthor.local;
					noteJson.author['url'] = grabbedAuthor.url;

					if (grabbedAuthor.displayname) {
						noteJson.author['displayname'] =
							grabbedAuthor.displayname;
					}

					noteJson.author['locked'] = grabbedAuthor.locked;
					noteJson.author['suspended'] = grabbedAuthor.suspended;
					noteJson.author['deactivated'] = grabbedAuthor.deactivated;
					noteJson.author['discoverable'] =
						grabbedAuthor.discoverable;
					noteJson.author['automated'] = grabbedAuthor.automated;

					if (grabbedAuthor.avatar) {
						noteJson.author['avatar'] = grabbedAuthor.avatar;
					}
					if (grabbedAuthor.banner) {
						noteJson.author['banner'] = grabbedAuthor.banner;
					}
					if (grabbedAuthor.background) {
						noteJson.author['background'] =
							grabbedAuthor.background;
					}
					if (grabbedAuthor.bio) {
						noteJson.author['bio'] = grabbedAuthor.bio;
					}

					noteJson.author['is_cat'] = grabbedAuthor.is_cat;
					noteJson.author['speak_as_cat'] =
						grabbedAuthor.speak_as_cat;
					noteJson.author['created_at'] = grabbedAuthor.created_at;

					if (grabbedAuthor.updated_at) {
						noteJson.author['updated_at'] =
							grabbedAuthor.updated_at;
					}

					noteJson['cw'] = grabbedNote.cw;
					noteJson['content'] = grabbedNote.content;
					noteJson['created_at'] = grabbedNote.created_at;
					noteJson['visibility'] = grabbedNote.visibility;

					res.status(200).json(noteJson);
				}
			} else {
				return res.status(500).json({
					message: 'Author of note invalid'
				});
			}
		} else {
			return res.status(404).json({
				message: 'Note does not exist'
			});
		}
	}
});

// create note
router.post(`/api/v1/note`, async (req, res) => {
	var authHeader = req.headers.authorization;
	if (authHeader) {
		if (authHeader.startsWith('Bearer ')) {
			var grabbedUserAuth = await db.getRepository('users_auth').findOne({
				where: {
					token: authHeader.replace('Bearer ', '')
				}
			});

			if (
				grabbedUserAuth &&
				grabbedUserAuth.token === authHeader.replace('Bearer ', '')
			) {
				const noteId = uuidv4();

				var noteToInsert = { author: {} };

				noteToInsert['id'] = noteId;
				noteToInsert['ap_id'] = `${config.url}notes/${noteId}`;

				noteToInsert['local'] = true;

				noteToInsert['author'] = grabbedUserAuth.user;

				const window = new JSDOM('').window;
				const purify = DOMPurify(window);

				noteToInsert['cw'] = purify.sanitize(JSON.parse(req.body).cw);
				noteToInsert['content'] = purify.sanitize(
					JSON.parse(req.body).content
				);

				noteToInsert['created_at'] = new Date(Date.now()).toISOString();

				if (JSON.parse(req.body).visibility === 'public') {
					noteToInsert['visibility'] = 'public';
				} else if (JSON.parse(req.body).visibility === 'unlisted') {
					noteToInsert['visibility'] = 'unlisted';
				} else if (JSON.parse(req.body).visibility === 'followers') {
					noteToInsert['visibility'] = 'followers';
				} else if (JSON.parse(req.body).visibility === 'direct') {
					noteToInsert['visibility'] = 'direct';
				} else {
					noteToInsert['visibility'] = 'public';
				}

				console.log(noteToInsert);

				await db.getRepository('notes').insert(noteToInsert);

				return res.status(200).json({
					message: 'Note created'
				});
			} else {
				return res.status(401).json({
					message: 'Invalid authentication token.'
				});
			}
		} else {
			return res.status(400).json({
				message: 'Token is not type Bearer'
			});
		}
	} else {
		return res.status(401).json({
			message: 'Authorization header missing.'
		});
	}
});

// edit note
router.patch(`/api/v1/note`, async (req, res) => {
	return res.status(501).json({
		message: 'Not implemented'
	});
});

// delete note
router.delete(`/api/v1/note`, async (req, res) => {
	return res.status(501).json({
		message: 'Not implemented'
	});
});

export default router;
