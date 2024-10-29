import { browser } from '$app/environment';

let defaults = {
	debug: false,

	homeTab: 'public',
	exploreTab: 'local',
	notificationsTab: 'all',

	locale: 'en_US',
	colorscheme: '',
	theme: '',
	font: '',

	self: undefined,
	token: undefined
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
}

export default new LocalStore();
