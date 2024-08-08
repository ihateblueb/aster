import chalk from 'chalk';

import { parse } from 'ini';
import { readFile } from 'node:fs/promises';
import { exit } from 'node:process';

let configText = await readFile(`../../config/production.ini`, {
	encoding: 'utf-8'
});

var config = parse(configText);

export default config;
