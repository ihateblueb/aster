import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import generateBlurHash from './generateBlurHash.js';
import calculateDimensions from './calculateDimensions.js';

export default async function generateThumbnail(file, type, userid, fileid) {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	if (type.startsWith('image')) {
		return await sharp(file)
			.resize(350)
			.webp()
			.toBuffer()
			.then(async (data) => {
				if (
					!fs.existsSync(
						path.resolve(
							__dirname,
							'..',
							'..',
							'..',
							'..',
							'..',
							'uploads',
							userid,
							'thumbnails'
						)
					)
				) {
					fs.mkdirSync(
						path.resolve(
							__dirname,
							'..',
							'..',
							'..',
							'..',
							'..',
							'uploads',
							userid,
							'thumbnails'
						),
						{ recursive: true }
					);
				}

				fs.writeFileSync(
					path.resolve(
						__dirname,
						'..',
						'..',
						'..',
						'..',
						'..',
						'uploads',
						userid,
						'thumbnails',
						`${fileid}.webp`
					),
					data
				);

				let dimensions = await calculateDimensions(data, 'image');

				return {
					url:
						'uploads/' + userid + '/thumbnails/' + fileid + '.webp',
					width: dimensions[0],
					height: dimensions[1],
					blurhash: await generateBlurHash(data)
				};
			});
	}
}
