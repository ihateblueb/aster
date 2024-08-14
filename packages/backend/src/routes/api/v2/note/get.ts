import express from 'express';

import db from '../../../../utils/database.js';
import generateNote from '../../../../generators/note.js';

const router = express.Router();

router.get('/api/v2/note/:noteid', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.noteid) {
		return res.status(400).json({
			message: 'Note ID parameter required'
		});
	} else {
		let grabbedNote = await db
			.getRepository('note')
			.createQueryBuilder()
			.where({ id: req.params.noteid })
			.getOne();

		let generatedNote = await generateNote(grabbedNote);

		if (generatedNote.status === 200) {
			return res.status(200).json(generatedNote.note);
		} else {
			return res.status(generatedNote.status).json({
				message: generatedNote.message
			});
		}
	}
});

export default router;
