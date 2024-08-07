import { encode } from 'blurhash';
import sharp from 'sharp';

export default async function generateBlurHash(file) {
	let image = sharp(file);
	let metadata = await image.metadata();

	return await image
		.raw()
		.ensureAlpha()
		.toBuffer()
		.then(async (data) => {
			let imageArray = new Uint8ClampedArray(data);
			let blurhash = encode(
				imageArray,
				metadata.width,
				metadata.height,
				6,
				6
			);
			return blurhash;
		});
}
