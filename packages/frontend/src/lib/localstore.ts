import { browser } from '$app/environment';

let defaults = {
	debug: false,

	homeTab: 'public',
	exploreTab: 'local',
	notificationsTab: 'all',

	locale: 'en_US',
	colorScheme: '',
	theme: '',

	self: undefined,
	token: undefined,

	defaultVisibility: 'public',

	sidebarLeft: {
		top: ['navigation'],
		bottom: ['account']
	},
	sidebarRight: {
		top: ['compose', 'notifications', 'development'],
		bottom: ['meta']
	},

	warnNoAlt: true,
	renderAdvancedMfm: true,
	catSpeak: true,
	uncollapseCws: false,
	hideAllMedia: false
};

class LocalStore {
	public defaults = defaults;

	public get(key: string) {
		let toReturn;

		if (browser) toReturn = localStorage.getItem('aster_' + key);

		if (toReturn) {
			return toReturn;
		} else {
			return defaults[key];
		}
	}

	public set(key: string, val: string) {
		if (browser) {
			if (val) {
				// a 'false' string is considered true!
				localStorage.setItem('aster_' + key, val);
			} else {
				localStorage.setItem('aster_' + key, '');
			}
		}

		return;
	}
}

export default new LocalStore();
