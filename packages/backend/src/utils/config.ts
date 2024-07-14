import chalk from 'chalk';

import { parse } from 'ini';
import { readFile } from 'node:fs/promises';
import { exit } from 'node:process';

let configText = await readFile(`../../config/production.ini`, {
	encoding: 'utf-8'
});

var config = parse(configText);

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
