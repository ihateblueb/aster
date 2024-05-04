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

const config = require('./utils/config.js');

if (!config.nodeadmin) {
	console.log(
		'[warn] its a good idea to specify your admin name in configuration'
	);
}

if (!config.nodeadmincontact) {
	console.log(
		'[warn] its a good idea to specify your admin contact information in configuration'
	);
}

const { inject, errorHandler } = require('express-custom-error');
inject();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./utils/requestLogger.js');

const typeorm = require('typeorm');
const dataSource = require('./utils/database.ts');

const app = express();

app.use(logger.dev, logger.combined);
app.use(bodyParser.raw({ type: '*/*' }));
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
