import db from '../database.js';
import logger from '../logger.js';
import sanitize from '../sanitize.js';
import { v4 as uuidv4 } from 'uuid';

export default async function processNewFile(attachment, note, author) {
	let driveFileToInsert = {};

	driveFileToInsert['id'] = uuidv4();
	driveFileToInsert['ap_id'] = sanitize(attachment.url);
	driveFileToInsert['user'] = sanitize(author.id);
	driveFileToInsert['note'] = sanitize(note.id);
	driveFileToInsert['created_at'] = sanitize(note.created_at);
	driveFileToInsert['updated_at'] = sanitize(note.created_at);
	driveFileToInsert['type'] = sanitize(attachment.mediaType);
	driveFileToInsert['src'] = sanitize(attachment.url);
	driveFileToInsert['alt'] = sanitize(attachment.summary);

	await db.getRepository('drive_file').insert(driveFileToInsert);

	logger('info', 'drive', 'created attachment ' + sanitize(attachment.url));

	return driveFileToInsert;
}
