import defaultLocalstore from './defaultLocalstore.json' with { type: 'json' };

export default {
	set: (key: string, val: string) => {
		return localStorage.setItem(key, val);
	},
	get: (key: string) => {
		let toReturn = localStorage.getItem(key);
		if (toReturn) {
			return toReturn;
		} else {
			return defaultLocalstore[key];
		}
	},
	del: (key: string) => {
		return localStorage.removeItem(key);
	},
	default: (key: string) => {
		return defaultLocalstore[key];
	},
	defaultAll: () => {
		return defaultLocalstore;
	}
};
