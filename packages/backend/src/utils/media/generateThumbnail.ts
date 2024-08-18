import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import generateBlurHash from './generateBlurHash.js';
import calculateDimensions from './calculateDimensions.js';
import config from '../config.js';
import Logger from '../logger.js';

export default async function generateThumbnail(
	file,
	extension,
	type,
	userid,
	fileid
) {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

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

	if (type.startsWith('image')) {
		return await sharp(file)
			.resize(350)
			.webp()
			.toBuffer()
			.then(async (data) => {
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
						new URL(config.get().url).href +
						'uploads/' +
						userid +
						'/thumbnails/' +
						fileid +
						'.webp',
					width: dimensions[0],
					height: dimensions[1],
					blurhash: await generateBlurHash(data)
				};
			});
	} else if (type.startsWith('video')) {
		console.log('hit generateThubmsnail');

		//ffmpeg -i thevideo.mov -vf "select=eq(n\,0)"  output.webp

		await ffmpeg()
			.on('start', (cmdline) => {
				console.log(cmdline);
			})
			.on('error', (err) => {
				console.log(err);
			})

			//.addOption(['-vf "select=eq(n\\,0)"'])
			.input(
				path.resolve(
					__dirname,
					'..',
					'..',
					'..',
					'..',
					'..',
					'uploads',
					userid,
					`${fileid}.${extension}`
				)
			)
			.toFormat('webp')
			.save(
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
				)
			)
			.run();

		return {
			url: '',
			width: '',
			height: '',
			blurhash: ''
		};
	} else {
		return {
			url: '',
			width: '',
			height: '',
			blurhash: ''
		};
	}
}
