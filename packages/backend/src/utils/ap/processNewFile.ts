import db from '../database.js';
import logger from '../logger.js';
import sanitize from '../sanitize.js';
import { v4 as uuidv4 } from 'uuid';

export default async function processNewFile(attachment, note, author) {
	let driveFileToInsert = {};

	driveFileToInsert['id'] = uuidv4();
	driveFileToInsert['ap_id'] = attachment.url;
	driveFileToInsert['user'] = author.id;
	driveFileToInsert['note'] = note.id;
	driveFileToInsert['created_at'] = note.created_at;
	driveFileToInsert['updated_at'] = note.created_at;
	driveFileToInsert['type'] = attachment.mediaType;
	driveFileToInsert['src'] = attachment.url;
	driveFileToInsert['alt'] = attachment.summary;

	await db.getRepository('drive_file').insert(driveFileToInsert);

	logger('info', 'drive', 'created attachment ' + attachment.url);

	return driveFileToInsert;
}
