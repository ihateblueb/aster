import { readFile } from 'node:fs/promises';

import { parse } from 'yaml';

import ConfigService from '../services/ConfigService.js';

const localeText = await readFile(
	`../../locale/${ConfigService.locale ? ConfigService.locale : 'en_US'}.yml`,
	{
		encoding: 'utf-8'
	}
);

const locale = parse(localeText);

export default locale;
