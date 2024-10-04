import express from 'express';

import RouterService from './services/RouterService.js';

import logger from './utils/logger.js';

process.title = 'Aster (worker)';

const app = express();
const port = 9972;

app.use('/', RouterService);

app.listen(port, () => {
	logger.done('boot', 'worker started');
});
