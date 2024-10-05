import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.use(
	'/uploads',
	express.static(
		path.resolve(__dirname, '..', '..', '..', '..', '..', 'uploads')
	)
);

export default router;
