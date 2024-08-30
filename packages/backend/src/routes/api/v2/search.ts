import express from 'express';

import db from '../../../utils/database.js';
import getSigned from '../../../utils/ap/getSigned.js';
import processNewActor from '../../../utils/ap/processNewActor.js';
import processNewNote from '../../../utils/ap/processNewNote.js';
import isValidUrl from '../../../utils/isValidUrl.js';
import search from '../../../utils/sonic/search.js';
import config from '../../../utils/config.js';
import Logger from '../../../utils/logger.js';
import { ILike } from 'typeorm';
import generateNote from '../../../generators/note.js';
import fromHtml from '../../../utils/mfm/fromHtml.js';
import getRemoteInstance from '../../../utils/ap/getRemoteInstance.js';

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
			Logger.debug('search', 'user grabbed by id');
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
			Logger.debug('search', 'user grabbed by ap_id');
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
			Logger.debug('search', 'user grabbed by url');
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
			Logger.debug('search', 'user grabbed by username');
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
			Logger.debug('search', 'user grabbed by displayname');
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
			Logger.debug('search', 'note grabbed by id');
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
			Logger.debug('search', 'note grabbed by ap_id');
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
			Logger.debug('search', 'note grabbed by replying_to');
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
			Logger.debug('search', 'note grabbed by author');
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
			Logger.debug('search', 'note grabbed by quoted');
			results.push({
				type: 'note',
				by: 'quoted',
				object: grabbedNote
			});
		}

		if (req.query.q.startsWith('@')) {
			let splitUsername = req.query.q.split('@');

			Logger.debug('search', splitUsername[1]);
			Logger.debug('search', splitUsername[2]);

			let grabbedUsers;

			if (splitUsername[1] && !splitUsername[2]) {
				grabbedUsers = await db.getRepository('user').find({
					where: {
						username: splitUsername[1]
					}
				});
			} else if (splitUsername[1] && splitUsername[2]) {
				grabbedUsers = await db.getRepository('user').find({
					where: {
						username: splitUsername[1],
						host: splitUsername[2]
					}
				});
			}

			for (const user in grabbedUsers) {
				results.push({
					type: 'user',
					by: 'handle',
					object: grabbedUsers[user]
				});
			}
		}

		if (req.query.q.startsWith('fetchOnly:')) {
			let grabbedObject = await getSigned(
				req.query.q.replace('fetchOnly:', '')
			);

			if (grabbedObject) {
				results.push({
					type: 'object',
					by: 'fetched',
					object: grabbedObject
				});
			}
		} else if (req.query.q.startsWith('fromHtml:')) {
			let grabbedObject = await fromHtml(
				req.query.q.replace('fromHtml:', '')
			);

			if (grabbedObject) {
				results.push({
					type: 'object',
					by: 'fetched',
					object: grabbedObject
				});
			}
		} else if (req.query.q.startsWith('refreshInstance:')) {
			let grabbedObject = await getRemoteInstance(
				req.query.q.replace('refreshInstance:', '')
			);

			if (grabbedObject) {
				results.push({
					type: 'object',
					by: 'fetched',
					object: grabbedObject
				});
			}
		} else if (tryLookup) {
			try {
				if (isValidUrl(req.query.q)) {
					let grabbedObject = await getSigned(req.query.q);

					if (!grabbedObject.error) {
						if (grabbedObject.data.type) {
							if (grabbedObject.data.type === 'Note') {
								let newNote = await processNewNote(
									grabbedObject.data
								);

								let generatedNote = await generateNote(newNote);

								results.push({
									type: 'note',
									by: 'fetched',
									object: generatedNote.note
								});
							} else if (
								grabbedObject.data.type === 'Person' ||
								grabbedObject.data.type === 'Service'
							) {
								let newActor = await processNewActor(
									grabbedObject.data
								);

								results.push({
									type: 'user',
									by: 'fetched',
									object: newActor
								});
							}
						}
					} else {
						Logger.error('search', 'failed to fetch url');
					}
				}
			} catch (e) {
				Logger.error('search', e);
			}
		}

		if (config.get().sonic.enabled) {
			let contentQuery = await search.query(
				config.get().sonic.collectionPrefix + '_content',
				config.get().sonic.bucket,
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
				config.get().sonic.collectionPrefix + '_cw',
				config.get().sonic.bucket,
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
				config.get().sonic.collectionPrefix + '_bio',
				config.get().sonic.bucket,
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
