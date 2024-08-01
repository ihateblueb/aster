import express from 'express';

import db from '../../../../utils/database.js';
import getSigned from '../../../../utils/ap/getSigned.js';

const router = express.Router();

router.get('/api/v2/note/:noteid/raw', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.noteid) {
		return res.status(400).json({
			message: 'Note ID parameter required'
		});
	} else {
		var grabbedNote = await db
			.getRepository('note')
			.createQueryBuilder()
			.where({ id: req.params.noteid })
			.getOne();

		let grabbedRawNote = await await getSigned(grabbedNote.ap_id);

		if (grabbedRawNote) {
			return res.status(200).json(grabbedRawNote);
		} else {
			return res.status(500).json({
				message: 'Failed to grab note'
			});
		}
	}
});

export default router;
