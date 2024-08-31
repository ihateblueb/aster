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

		if (!body.name.startsWith(':')) {
			body.name = ':' + body.name;
		}
		if (!body.name.endsWith(':')) {
			body.name = body.name + ':';
		}

		emojiToInsert['id'] = emojiId;
		emojiToInsert['ap_id'] = sanitize(body.id);
		emojiToInsert['created_at'] = sanitize(body.updated);
		emojiToInsert['updated_at'] = sanitize(body.updated);
		emojiToInsert['local'] = false;
		emojiToInsert['host'] = new URL(sanitize(body.id)).host;
		emojiToInsert['name'] = sanitize(body.name);
		emojiToInsert['url'] = sanitize(body.icon.url);
		emojiToInsert['type'] = sanitize(body.icon.mediaType);

		await db.getRepository('emoji').insert(emojiToInsert);

		logger.info('ap', 'created remote emoji ' + body.id);

		return emojiToInsert;
	}
}
