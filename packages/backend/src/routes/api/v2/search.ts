import express from 'express';

import db from '../../../utils/database.js';
import getSigned from '../../../utils/ap/getSigned.js';
import processNewActor from '../../../utils/ap/processNewActor.js';
import processNewNote from '../../../utils/ap/processNewNote.js';
import isValidUrl from '../../../utils/isValidUrl.js';
import search from '../../../utils/sonic/search.js';
import config from '../../../utils/config.js';

const router = express.Router();

// get ad by id or random
router.get('/api/v2/search', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.query.q) {
		return res.status(400).json({
			message: 'Query required'
		});
	} else {
		let query = await search.query(
			config.sonic.collection,
			config.sonic.bucket,
			req.query.q
		);

		return res.status(200).json(query);
	}
});

router.get('/api/v2/fetch', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.query.q) {
		return res.status(400).json({
			message: 'Query required'
		});
	} else {
		if (isValidUrl(req.query.q)) {
			let grabbedUser = await db.getRepository('user').findOne({
				where: {
					ap_id: req.query.q
				}
			});

			if (grabbedUser) {
				return res.status(200).json({
					message: 'Found user',
					type: 'user',
					id: grabbedUser.id
				});
			} else {
				let grabbedNote = await db.getRepository('note').findOne({
					where: {
						ap_id: req.query.q
					}
				});

				if (grabbedNote) {
					return res.status(200).json({
						message: 'Found note',
						type: 'note',
						id: grabbedNote.id
					});
				} else {
					// not a user or note already stored

					let grabbedEntity = await getSigned(req.query.q);

					if (grabbedEntity && !grabbedEntity.error) {
						if (grabbedEntity.data.type === 'Person') {
							let grabbedUserAgain = await db
								.getRepository('note')
								.findOne({
									where: {
										ap_id: grabbedEntity.data.id
									}
								});

							if (grabbedUserAgain) {
								return res.status(200).json({
									message: 'Found user',
									type: 'user',
									id: grabbedUserAgain.id
								});
							} else {
								let newUser = await processNewActor(
									grabbedEntity.data
								);
								return res.status(200).json({
									message: 'Got user',
									type: 'user',
									id: newUser.id
								});
							}
						} else if (grabbedEntity.data.type === 'Note') {
							let grabbedNoteAgain = await db
								.getRepository('note')
								.findOne({
									where: {
										ap_id: grabbedEntity.data.id
									}
								});

							if (grabbedNoteAgain) {
								return res.status(200).json({
									message: 'Found note',
									type: 'note',
									id: grabbedNoteAgain.id
								});
							} else {
								let newNote = await processNewNote(
									grabbedEntity.data
								);
								return res.status(200).json({
									message: 'Got note',
									type: 'note',
									id: newNote.id
								});
							}
						} else {
							return res.status(500).json({
								message: 'Unable to find entity'
							});
						}
					}
				}
			}
		} else {
			if (req.query.q.startsWith('@')) {
				return res.status(200).json({
					message: 'Lookup probably possible',
					type: 'lookup'
				});
			} else {
				/*
					i'd like to implement filters and such for this.

					like

					acct:me
					acct:@blueb@host
					acct:blueb@host
					acct:@blueb
					acct:blueb
					host:example.com
					host:*.example.com

					but also

					!acct or !host or !note
				*/
				return res.status(501).json({
					message: 'Text search not implemented'
				});
			}
		}
	}
});

export default router;
