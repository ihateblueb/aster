import { parse } from 'ini';
import { readFile } from 'node:fs/promises';

let configText = await readFile(`../../config/production.ini`, {
	encoding: 'utf-8'
});

let config = parse(configText);

export default config;
