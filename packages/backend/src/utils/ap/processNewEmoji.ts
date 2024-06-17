import db from '../database.js';
import logger from '../logger.js';
import sanitize from '../sanitize.js';
import { v4 as uuidv4 } from 'uuid';

export default async function processNewEmoji(body) {
	if (body.data.type === 'Emoji') {
		let emojiToInsert = {};

		const emojiId = uuidv4();

		emojiToInsert['id'] = emojiId;
		emojiToInsert['ap_id'] = body.data.id;
		emojiToInsert['created_at'] = body.data.updated;
		emojiToInsert['updated_at'] = body.data.updated;
		emojiToInsert['local'] = false;
		emojiToInsert['host'] = new URL(body.data.id).host;
		emojiToInsert['name'] = body.data.name;
		emojiToInsert['url'] = body.data.icon.url;

		await db.getRepository('emojis').insert(emojiToInsert);

		logger('info', 'ap', 'created remote emoji ' + body.data.id);

		return emojiToInsert;
	}
}
