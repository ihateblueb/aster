import db from '../database.js';
import logger from '../logger.js';
import sanitize from '../sanitize.js';
import { v4 as uuidv4 } from 'uuid';

export default async function processNewEmoji(body) {
	if (body.type === 'Emoji') {
		let emojiToInsert = {};

		const emojiId = uuidv4();

		emojiToInsert['id'] = emojiId;
		emojiToInsert['ap_id'] = body.id;
		emojiToInsert['created_at'] = body.updated;
		emojiToInsert['updated_at'] = body.updated;
		emojiToInsert['local'] = false;
		emojiToInsert['host'] = new URL(body.id).host;
		emojiToInsert['name'] = body.name;
		emojiToInsert['url'] = body.url;

		await db.getRepository('emojis').insert(emojiToInsert);

		console.log(emojiToInsert);
		logger('info', 'ap', 'created remote emoji ' + body.object.id);

		return emojiToInsert;
	}
}
