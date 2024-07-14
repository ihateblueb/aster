import chalk from 'chalk';

import { parse } from 'ini';
import { readFile } from 'node:fs/promises';

let configText = await readFile(`../../config/production.ini`, {
	encoding: 'utf-8'
});

const config = parse(configText);

console.log(
	chalk.gray(new Date(Date.now()).toLocaleTimeString()) +
		' [' +
		chalk.bgBlue('info') +
		' ' +
		chalk.blue('core') +
		']' +
		' ' +
		'configuration loaded'
);

export default config;
