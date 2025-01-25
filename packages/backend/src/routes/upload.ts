import plugin from 'fastify-plugin';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Miscellaneous']
	} as const;

	fastify.post(
		'/upload',
		{
			schema: schema
		},
		async (req, reply) => {
			/*
		const auth = await AuthService.verify(req.headers.authorization);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		const dir = __dirname + '/../../../../../uploads/' + auth.user.id;

		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
		if (!fs.existsSync(tmpdir)) fs.mkdirSync(tmpdir, { recursive: true });

		const form = formidable({
			uploadDir: dir,
			encoding: 'utf-8',
			keepExtensions: true,
			multiples: true
		});

		const [fields, files] = await form.parse(req);

		if (files && files.files)
			for (const file of files.files) {
				let fileSrc =
					ConfigService.url.href +
					'uploads/' +
					auth.user.id +
					'/' +
					file.newFilename;

				logger.debug('upload', 'created file ' + fileSrc);

				await DriveService.create(
					fileSrc,
					file.mimetype,
					undefined,
					false,
					auth.user.id
				);
			}

		return res.status(200).send();
		*/
			return reply.status(501).send();
		}
	);
});
