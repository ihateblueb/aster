//
// Aster
//

process.title = 'Aster';

console.log('            _____ _______ ______ _____  ');
console.log('     /\\    / ____|__   __|  ____|  __ \\ ');
console.log('    /  \\  | (___    | |  | |__  | |__) |');
console.log('   / /\\ \\  \\___ \\   | |  |  __| |  _  / ');
console.log('  / ____ \\ ____) |  | |  | |____| | \\ \\ ');
console.log(' /_/    \\_\\_____/   |_|  |______|_|  \\_\\');
console.log('                                        ');

const pkg = require('../../../package.json');

console.log(`starting ${pkg.name} v${pkg.version} by ${pkg.author}...`);
console.log(' ');

const config = require('./util/config.js');

const { inject, errorHandler } = require('express-custom-error');
inject();

const express = require('express');
const cors = require('cors');
const logger = require('./util/logger.js');

const typeorm = require('typeorm');
const dataSource = require('./util/database.ts');

const app = express();

app.use(logger.dev, logger.combined);
app.use(cors());

app.use('/', require('./routes/router.js'));

app.use(errorHandler());

app.use('*', (req, res) => {
	res.status(404).json({ message: 'not found' });
});

app.listen(config.port, () =>
	console.info(
		`[backend] started instance as ${config.url} (port ${config.port})`
	)
);
