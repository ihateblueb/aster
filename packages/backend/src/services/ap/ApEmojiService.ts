import { ObjectLiteral } from 'typeorm';

import { DriveFile } from '../../entities/DriveFile.js';
import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import DriveService from '../DriveService.js';
import EmojiService from '../EmojiService.js';
import IdService from '../IdService.js';
import SanitizerService from '../SanitizerService.js';
import ValidationService from '../ValidationService.js';
import ApValidationService from './ApValidationService.js';

class ApEmojiService {
	public async get(apId: ApId) {
		const existingEmoji = await EmojiService.get({ apId: apId });
		if (existingEmoji) return existingEmoji;
		return false;
	}

	public async register(body: ApObject) {
		if (!ApValidationService.validBody(body)) return false;

		console.log(body);

		const id = IdService.generate();
		let emoji: ObjectLiteral = {
			id: id,
			apId: SanitizerService.sanitize(body.id),
			createdAt: new Date().toISOString()
		};

		if (!body.name) return false;
		emoji['shortcode'] = SanitizerService.sanitize(
			body.name.replaceAll(':', '')
		);

		emoji['host'] = new URL(body.id).host;

		let src;
		if (body.icon.url) src = SanitizerService.sanitize(body.icon.url);
		if (!src || !ValidationService.validUrl(src)) return false;

		let driveFile = await DriveService.create(src);
		if (!driveFile) return false;

		emoji['fileId'] = driveFile.id;

		await db
			.getRepository('emoji')
			.insert(emoji)
			.catch((err) => {
				console.log(err);
				logger.error('ap', 'failed to insert emoji');
			});

		return await EmojiService.get({ apId: body.id });
	}
}

export default new ApEmojiService();
