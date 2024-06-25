import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import OutCreate from '../../../utils/ap/outgoing/create.js';
import verifyToken from '../../../utils/auth/verifyToken.js';
import config from '../../../utils/config.js';
import db from '../../../utils/database.js';
import logger from '../../../utils/logger.js';
import sanitize from '../../../utils/sanitize.js';
import ApNote from '../../../constructors/ApNote.js';

const router = express.Router();

router.get('/api/v1/note/:noteid', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.noteid) {
		return res.status(400).json({
			message: 'Note ID parameter required'
		});
	} else {
		var grabbedNote = await db
			.getRepository('note')
			.createQueryBuilder()
			.select('note')
			.where({ id: req.params.noteid })
			.innerJoinAndSelect('note.replying_to', 'note')
			.innerJoinAndSelect('note.author', 'user')
			.innerJoinAndSelect('note.edits', 'note_edit')
			.innerJoinAndSelect('note.replies', 'note')
			.innerJoinAndSelect('note.reactions', 'note_react')
			.getOne();

		if (grabbedNote) {
			if (grabbedNote.author) {
				if (grabbedNote.author.suspended) {
					return res.status(400).json({
						message: 'Note author suspended'
					});
				} else if (grabbedNote.author.deactivated) {
					return res.status(400).json({
						message: 'Note author deactivated'
					});
				} else {
					var sortedReactions = [];

					grabbedNote.reactions.forEach(async (reaction) => {
						if (
							sortedReactions.find(
								(e) => e.id === reaction.emoji.id
							)
						) {
							sortedReactions.find(
								(e) => e.id === reaction.emoji.id
							).count += 1;
							sortedReactions
								.find((e) => e.id === reaction.emoji.id)
								.from.push(reaction.user);
						} else {
							sortedReactions.push({
								id: reaction.emoji.id,
								url: reaction.emoji.url,
								name: reaction.emoji.name,
								host: reaction.emoji.host,
								local: reaction.emoji.local,
								count: 1,
								from: [reaction.user]
							});
						}
					});

					grabbedNote.reactions = sortedReactions;

					res.status(200).json(grabbedNote);
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
	var authRes = await verifyToken(req.headers.authorization);

	if (authRes.status === 200) {
		const noteId = uuidv4();

		var noteToInsert = { author: {} };

		noteToInsert['id'] = noteId;
		noteToInsert['ap_id'] = `${config.url}notes/${noteId}`;

		noteToInsert['local'] = true;

		noteToInsert['author'] = authRes.grabbedUserAuth.user;

		noteToInsert['cw'] = sanitize(JSON.parse(req.body).cw);
		noteToInsert['content'] = sanitize(JSON.parse(req.body).content);

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

		let insertedNote = (
			await db.getRepository('notes').insert(noteToInsert)
		).raw;

		await OutCreate(authRes.grabbedUserAuth.user, new ApNote(insertedNote));

		return res.status(200).json({
			message: 'Note created',
			note: noteToInsert
		});
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

// edit note
router.patch(`/api/v1/note`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (authRes.status === 200) {
		return res.status(501).json({
			message: 'Not implemented'
		});
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

// delete note
router.delete(`/api/v1/note`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (authRes.status === 200) {
		if (JSON.parse(req.body).id) {
			let noteFromDb = await db.getRepository('notes').findOne({
				where: {
					id: JSON.parse(req.body).id
				}
			});

			if (noteFromDb) {
				if (noteFromDb.author === authRes.grabbedUserAuth.user) {
					await db.getRepository('notes').delete(noteFromDb.id);
					return res.status(200).json({
						message: 'Note deleted.'
					});
				} else {
					return res.status(401).json({
						message: "You cannot delete other people's notes."
					});
				}
			} else {
				return res.status(404).json({
					message: 'Note not found.'
				});
			}
		} else {
			return res.status(400).json({
				message: 'Note ID required.'
			});
		}
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

/*
	Note Interactions
*/

// react to note
router.post(`/api/v1/note/:noteid/react`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			logger('debug', 'note', 'note react requested');
			return res.status(501).json({
				message: 'Not implemented'
			});
		} else {
			return res.status(authRes.status).json({
				message: authRes.message
			});
		}
	} else {
		return res.status(400).json({
			message: 'Note ID parameter required'
		});
	}
});

// repeat note
router.post(`/api/v1/note/:noteid/repeat`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			logger('debug', 'note', 'note repeat requested');
			return res.status(501).json({
				message: 'Not implemented'
			});
		} else {
			return res.status(authRes.status).json({
				message: authRes.message
			});
		}
	} else {
		return res.status(400).json({
			message: 'Note ID parameter required'
		});
	}
});

// quote note
router.post(`/api/v1/note/:noteid/quote`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			logger('debug', 'note', 'note quote requested');
			return res.status(501).json({
				message: 'Not implemented'
			});
		} else {
			return res.status(authRes.status).json({
				message: authRes.message
			});
		}
	} else {
		return res.status(400).json({
			message: 'Note ID parameter required'
		});
	}
});

// bookmark note
router.post(`/api/v1/note/:noteid/bookmark`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			logger('debug', 'note', 'note bookmark requested');
			return res.status(501).json({
				message: 'Not implemented'
			});
		} else {
			return res.status(authRes.status).json({
				message: authRes.message
			});
		}
	} else {
		return res.status(400).json({
			message: 'Note ID parameter required'
		});
	}
});

// pin note
router.post(`/api/v1/note/:noteid/pin`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			logger('debug', 'note', 'note pin requested');

			await db
				.getRepository('user')
				.query(
					`UPDATE "users" SET "pinned_notes" = array_append("pinned_notes", '${req.params.noteid}') WHERE "id" = '${authRes.grabbedUserAuth.user}'`
				);

			return res.status(200).json({
				message: 'Pinned note'
			});
		} else {
			return res.status(authRes.status).json({
				message: authRes.message
			});
		}
	} else {
		return res.status(400).json({
			message: 'Note ID parameter required'
		});
	}
});

// unpin note
router.post(`/api/v1/note/:noteid/unpin`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			logger('debug', 'note', 'note pin requested');

			await db
				.getRepository('user')
				.query(
					`UPDATE "users" SET "pinned_notes" = array_remove("pinned_notes", '${req.params.noteid}') WHERE "id" = '${authRes.grabbedUserAuth.user}'`
				);

			return res.status(200).json({
				message: 'Pinned note'
			});
		} else {
			return res.status(authRes.status).json({
				message: authRes.message
			});
		}
	} else {
		return res.status(400).json({
			message: 'Note ID parameter required'
		});
	}
});

// report note
router.post(`/api/v1/note/:noteid/report`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			logger('debug', 'note', 'note report requested');
			return res.status(501).json({
				message: 'Not implemented'
			});
		} else {
			return res.status(authRes.status).json({
				message: authRes.message
			});
		}
	} else {
		return res.status(400).json({
			message: 'Note ID parameter required'
		});
	}
});

export default router;
