import sharp from 'sharp';
import Logger from '../logger.js';

export default async function calculateDimensions(file, type) {
	if (type.startsWith('image')) {
		try {
			let image = sharp(file);
			let metadata = await image.metadata();
			return [metadata.width, metadata.height];
		} catch (e) {
			Logger.debug('media', 'failed to calculate dimensions of ' + type);
			console.log(e);
		}
	} else {
		return ['', ''];
	}
}
