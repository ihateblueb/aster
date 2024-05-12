import yaml from 'js-yaml';
import fs from 'fs';

try {
	var config = yaml.load(
		fs.readFileSync('../../config/production.yml', 'utf8')
	);
	console.log('[config] configuration loaded successfully!');
} catch (e) {
	console.error('[config] ' + e);
	console.error('[config] fatal. now aborting.');
	process.exit(1);
}

export default config;
