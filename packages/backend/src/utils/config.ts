import { stringify, parse } from 'ini';
import { readFile, writeFile } from 'node:fs/promises';

let configText = await readFile(`../../config/production.ini`, {
	encoding: 'utf-8'
});

let config;

config = parse(configText);

class Config {
	public get() {
		return config;
	}

	public async set(property: string, value: string) {
		config[property] = value;

		let configText = await stringify(config);

		await writeFile(`../../config/production.ini`, configText);

		return config;
	}

	public async reload() {
		configText = await readFile(`../../config/production.ini`, {
			encoding: 'utf-8'
		});
		config = parse(configText);

		return config;
	}
}

export default new Config();
