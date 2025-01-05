import ConfigService from '../services/ConfigService.js';

export default [
	'https://www.w3.org/ns/activitystreams',
	'https://w3id.org/security/v1',
	ConfigService.url.href + 'context.json'
];
