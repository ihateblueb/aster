import { readFile } from 'node:fs/promises';

import { parse } from 'ini';

let configText = await readFile(`../../config/production.ini`, {
	encoding: 'utf-8'
});

let config = parse(configText);

export default config;
