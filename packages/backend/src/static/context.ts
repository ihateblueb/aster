import config from '../utils/config.js';

export default [
	'https://www.w3.org/ns/activitystreams',
	'https://w3id.org/security/v1',
	new URL(config.url).href + 'context.json'
];
