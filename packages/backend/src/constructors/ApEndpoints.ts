import config from '../utils/config.js';

export default class ApEndpoints {
	sharedInbox: string = 'https://' + new URL(config.url).host + '/inbox';

	build() {
		return this;
	}
}
