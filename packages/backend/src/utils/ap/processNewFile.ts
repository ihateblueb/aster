import db from '../database.js';
import logger from '../logger.js';
import calculateDimensions from '../media/calculateDimensions.js';
import generateThumbnail from '../media/generateThumbnail.js';
import sanitize from '../sanitize.js';
import { v4 as uuidv4 } from 'uuid';

export default async function processNewFile(attachment, note, author) {
	let driveFileToInsert = {};

	const fileId = uuidv4();

	driveFileToInsert['id'] = fileId;
	driveFileToInsert['ap_id'] = sanitize(attachment.url);
	driveFileToInsert['user'] = sanitize(author.id);
	driveFileToInsert['note'] = sanitize(note.id);
	driveFileToInsert['created_at'] = sanitize(note.created_at);
	driveFileToInsert['updated_at'] = sanitize(note.created_at);
	driveFileToInsert['type'] = sanitize(attachment.mediaType);
	driveFileToInsert['src'] = sanitize(attachment.url);
	driveFileToInsert['alt'] = sanitize(attachment.summary);

	let thumbnail = await generateThumbnail(
		attachment.url,
		'',
		attachment.mediaType,
		author.id,
		fileId
	);

	let dimensions = await calculateDimensions(
		attachment.url,
		attachment.mediaType
	);

	driveFileToInsert['width'] = dimensions[0];
	driveFileToInsert['height'] = dimensions[1];

	driveFileToInsert['thumbnail'] = thumbnail.url;
	driveFileToInsert['thumbnail_width'] = thumbnail.width;
	driveFileToInsert['thumbnail_height'] = thumbnail.height;
	driveFileToInsert['blurhash'] = thumbnail.blurhash;

	await db.getRepository('drive_file').insert(driveFileToInsert);

	logger('info', 'drive', 'created attachment ' + sanitize(attachment.url));

	return driveFileToInsert;
}
