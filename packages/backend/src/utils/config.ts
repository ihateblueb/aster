import { readFile } from 'node:fs/promises';
import { parse } from 'ini';

let configText = await readFile(`../../config/production.ini`, {
	encoding: 'utf-8'
});

const config = parse(configText);

console.log('configuration loaded');

export default config;
