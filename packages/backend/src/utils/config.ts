import { readFile } from 'node:fs/promises';

import { parse } from 'ini';

const configText = await readFile(`../../config/${process.env.NODE_ENV === "development" ? 'development' : 'production'}.ini`, {
	encoding: 'utf-8'
});

const config = parse(configText);
export default config;
