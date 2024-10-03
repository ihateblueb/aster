import express from 'express';

import LoggerService from './services/LoggerService.js';
import RouterService from './services/RouterService.js';

process.title = 'Aster (worker)';

const app = express();
const port = 9972;

app.use(RouterService.router);

app.listen(port, () => {
	LoggerService.done('boot', 'worker started');
});
