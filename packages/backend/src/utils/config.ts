import { parse } from 'ini';
import { readFile } from 'node:fs/promises';

let configText = await readFile(`../../config/production.ini`, {
	encoding: 'utf-8'
});

const config = parse(configText);

console.log('configuration loaded');

export default config;
