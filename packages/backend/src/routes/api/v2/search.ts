import express from 'express';

import db from '../../../utils/database.js';
import getSigned from '../../../utils/ap/getSigned.js';
import processNewActor from '../../../utils/ap/processNewActor.js';
import processNewNote from '../../../utils/ap/processNewNote.js';
import isValidUrl from '../../../utils/isValidUrl.js';
import search from '../../../utils/sonic/search.js';
import config from '../../../utils/config.js';
import logger from '../../../utils/logger.js';
import { ILike } from 'typeorm';
import generateNote from '../../../generators/note.js';

const router = express.Router();

// get ad by id or random
router.get('/api/v2/search', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.query.q) {
		return res.status(400).json({
			message: 'Query required'
		});
	} else {
		let results = [];
		let tryLookup = true;

		let grabbedUser;
		let grabbedNote;

		grabbedUser = await db.getRepository('user').findOne({
			where: {
				id: ILike(req.query.q)
			}
		});

		if (grabbedUser) {
			logger('debug', 'search', 'user grabbed by id');
			results.push({
				type: 'user',
				by: 'id',
				object: grabbedUser
			});
		}

		grabbedUser = await db.getRepository('user').findOne({
			where: {
				ap_id: ILike(req.query.q)
			}
		});

		if (grabbedUser) {
			logger('debug', 'search', 'user grabbed by ap_id');
			tryLookup = false;
			results.push({
				type: 'user',
				by: 'ap_id',
				object: grabbedUser
			});
		}

		grabbedUser = await db.getRepository('user').findOne({
			where: {
				url: ILike(req.query.q)
			}
		});

		if (grabbedUser) {
			logger('debug', 'search', 'user grabbed by url');
			tryLookup = false;
			results.push({
				type: 'user',
				by: 'url',
				object: grabbedUser
			});
		}

		grabbedUser = await db.getRepository('user').findOne({
			where: {
				username: ILike(req.query.q)
			}
		});

		if (grabbedUser) {
			logger('debug', 'search', 'user grabbed by username');
			results.push({
				type: 'user',
				by: 'username',
				object: grabbedUser
			});
		}

		grabbedUser = await db.getRepository('user').findOne({
			where: {
				displayname: ILike(req.query.q)
			}
		});

		if (grabbedUser) {
			logger('debug', 'search', 'user grabbed by displayname');
			results.push({
				type: 'user',
				by: 'displayname',
				object: grabbedUser
			});
		}

		grabbedNote = await db.getRepository('note').findOne({
			where: {
				id: ILike(req.query.q)
			}
		});

		if (grabbedNote) {
			logger('debug', 'search', 'note grabbed by id');
			results.push({
				type: 'note',
				by: 'id',
				object: grabbedNote
			});
		}

		grabbedNote = await db.getRepository('note').findOne({
			where: {
				ap_id: ILike(req.query.q)
			}
		});

		if (grabbedNote) {
			logger('debug', 'search', 'note grabbed by ap_id');
			tryLookup = false;
			results.push({
				type: 'note',
				by: 'ap_id',
				object: grabbedNote
			});
		}

		grabbedNote = await db.getRepository('note').findOne({
			where: {
				replying_to: ILike(req.query.q)
			}
		});

		if (grabbedNote) {
			logger('debug', 'search', 'note grabbed by replying_to');
			results.push({
				type: 'note',
				by: 'replying_to',
				object: grabbedNote
			});
		}

		grabbedNote = await db.getRepository('note').findOne({
			where: {
				author: ILike(req.query.q)
			}
		});

		if (grabbedNote) {
			logger('debug', 'search', 'note grabbed by author');
			results.push({
				type: 'note',
				by: 'author',
				object: grabbedNote
			});
		}

		grabbedNote = await db.getRepository('note').findOne({
			where: {
				quoted: ILike(req.query.q)
			}
		});

		if (grabbedNote) {
			logger('debug', 'search', 'note grabbed by quoted');
			results.push({
				type: 'note',
				by: 'quoted',
				object: grabbedNote
			});
		}

		if (config.sonic.enabled) {
			let contentQuery = await search.query(
				config.sonic.collectionPrefix + '_content',
				config.sonic.bucket,
				req.query.q
			);

			if (contentQuery) {
				for (const id of contentQuery) {
					let grabbedNote = await db.getRepository('note').findOne({
						where: {
							id: id
						}
					});

					if (grabbedNote) {
						let generatedNote = await generateNote(grabbedNote);

						if (generatedNote.note) {
							results.push({
								type: 'note',
								by: 'content',
								object: generatedNote.note
							});
						}
					}
				}
			}

			let cwQuery = await search.query(
				config.sonic.collectionPrefix + '_cw',
				config.sonic.bucket,
				req.query.q
			);

			if (cwQuery) {
				for (const id of cwQuery) {
					let grabbedNote = await db.getRepository('note').findOne({
						where: {
							id: id
						}
					});

					if (grabbedNote) {
						let generatedNote = await generateNote(grabbedNote);

						if (generatedNote.note) {
							results.push({
								type: 'note',
								by: 'cw',
								object: generatedNote.note
							});
						}
					}
				}
			}

			let bioQuery = await search.query(
				config.sonic.collectionPrefix + '_bio',
				config.sonic.bucket,
				req.query.q
			);

			if (bioQuery) {
				for (const id of bioQuery) {
					let grabbedUser = await db.getRepository('user').findOne({
						where: {
							id: id
						}
					});

					if (grabbedUser) {
						results.push({
							type: 'user',
							by: 'bio',
							object: grabbedUser
						});
					}
				}
			}
		}

		if (results && results.length > 0) {
			return res.status(200).json({
				message: 'Got ' + results.length + ' results',
				results: results
			});
		} else {
			return res.status(404).json({
				message: 'No results found'
			});
		}
	}
});

export default router;
