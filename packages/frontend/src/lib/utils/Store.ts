import defaultStore from './defaultStore.json' with { type: 'json' };

export default {
	set: (key: string, val: string) => {
		return localStorage.setItem(key, val);
	},
	get: (key: string) => {
		let toReturn = localStorage.getItem(key);
		if (toReturn) {
			return toReturn;
		} else {
			return defaultStore[key];
		}
	},
	del: (key: string) => {
		return localStorage.removeItem(key);
	},
	default: (key: string) => {
		return defaultStore[key];
	},
	defaultAll: () => {
		return defaultStore;
	}
};
