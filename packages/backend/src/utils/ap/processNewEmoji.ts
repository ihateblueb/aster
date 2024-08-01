import db from '../database.js';
import logger from '../logger.js';
import sanitize from '../sanitize.js';
import { v4 as uuidv4 } from 'uuid';

export default async function processNewEmoji(body) {
	if (body.type === 'Emoji') {
		let emojiToInsert = {
			id: ''
		};

		const emojiId = uuidv4();

		emojiToInsert['id'] = emojiId;
		emojiToInsert['ap_id'] = sanitize(body.id);
		emojiToInsert['created_at'] = sanitize(body.updated);
		emojiToInsert['updated_at'] = body.updated;
		emojiToInsert['local'] = false;
		emojiToInsert['host'] = new URL(body.id).host;
		emojiToInsert['name'] = body.name;
		emojiToInsert['url'] = body.icon.url;
		emojiToInsert['type'] = body.icon.mediaType;

		await db.getRepository('emoji').insert(emojiToInsert);

		logger('info', 'ap', 'created remote emoji ' + body.id);

		return emojiToInsert;
	}
}
