import { readFile } from 'node:fs/promises';

import { parse } from 'yaml';

import config from './config.js';

const localeText = await readFile(
	`../../locale/${config.locale ? config.locale : 'en_US'}.yml`,
	{
		encoding: 'utf-8'
	}
);

const locale = parse(localeText);

export default locale;
