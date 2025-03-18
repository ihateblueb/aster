import { browser } from '$app/environment';

let defaults = {
	debug: {
		type: 'boolean',
		value: false
	},

	homeTab: {
		type: 'string',
		value: 'public'
	},
	exploreTab: {
		type: 'string',
		value: 'local'
	},
	notificationsTab: {
		type: 'string',
		value: ''
	},

	locale: {
		type: 'string',
		value: 'en_US'
	},
	colorScheme: {
		type: 'string',
		value: ''
	},
	theme: {
		type: 'string',
		value: ''
	},

	self: {
		type: 'json',
		value: undefined
	},
	token: {
		type: 'string',
		value: undefined
	},

	emojis: {
		type: 'json',
		value: undefined
	},

	defaultVisibility: {
		type: 'string',
		value: 'public'
	},

	sidebarLeft: {
		type: 'json',
		value: {
			top: ['navigation'],
			bottom: ['account']
		}
	},
	sidebarRight: {
		type: 'json',
		value: {
			top: ['compose', 'notifications'],
			bottom: ['meta']
		}
	},

	warnNoAlt: {
		type: 'boolean',
		value: true
	},

	useSystemFont: {
		type: 'boolean',
		value: false
	},
	useRoundedAvatars: {
		type: 'boolean',
		value: false
	},
	activeRequestsSpinner: {
		type: 'boolean',
		value: true
	},

	liveUpdateTimelines: {
		type: 'boolean',
		value: true
	},
	fetchMoreOnScroll: {
		type: 'boolean',
		value: true
	},
	renderAdvancedMfm: {
		type: 'boolean',
		value: true
	},
	animatedMfm: {
		type: 'boolean',
		value: false
	},
	catSpeak: {
		type: 'boolean',
		value: true
	},
	uncollapseCws: {
		type: 'boolean',
		value: false
	},
	hideAllMedia: {
		type: 'boolean',
		value: false
	},
	blurSensitiveUserAvatars: {
		type: 'boolean',
		value: true
	},

	hideInteractionCounters: {
		type: 'boolean',
		value: false
	},

	enableSounds: {
		type: 'boolean',
		value: true
	},
	soundVolume: {
		type: 'number',
		value: 0.25
	}
};

class localstore {
	public defaults = defaults;

	public get(key: string) {
		if (key !== 'debug' && this.getParsed('debug'))
			console.debug('[localstore get] ' + key);

		let toReturn;

		if (browser) toReturn = localStorage.getItem('aster_' + key);

		if (toReturn) {
			return toReturn;
		} else {
			return defaults[key].value;
		}
	}

	public getParsed(key: string) {
		if (key !== 'debug' && this.getParsed('debug'))
			console.debug('[localstore getParsed] ' + key);

		try {
			let defaultObj: { type: string; value: any } | undefined =
				defaults[key];
			if (!defaultObj) return undefined;

			let toReturn;
			if (browser) toReturn = localStorage.getItem('aster_' + key);

			if (toReturn) {
				if (defaultObj.type === 'string') return String(toReturn);
				if (defaultObj.type === 'boolean') return Boolean(toReturn);
				if (defaultObj.type === 'number') return Number(toReturn);
				if (defaultObj.type === 'json') return JSON.parse(toReturn);
			} else {
				return defaultObj.value;
			}
		} catch (e) {
			console.error('failed getParsed of ' + key, e);
			return undefined;
		}
	}

	public set(key: string, val: string) {
		if (this.getParsed('debug'))
			console.debug('[localstore set] ' + key, val);

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

	public delete(key: string) {
		if (this.getParsed('debug'))
			console.debug('[localstore delete] ' + key);

		if (browser) localStorage.removeItem('aster_' + key);
	}
}

export default new localstore();
