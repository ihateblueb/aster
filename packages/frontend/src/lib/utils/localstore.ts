import defaultLocalstore from './defaultLocalstore.json' with { type: 'json' };

export default {
	set: (key: string, val: string) => {
		return localStorage.setItem('aster_' + key, val);
	},
	get: (key: string) => {
		let toReturn = localStorage.getItem('aster_' + key);
		if (toReturn) {
			return toReturn;
		} else {
			return defaultLocalstore[key];
		}
	},
	del: (key: string) => {
		return localStorage.removeItem('aster_' + key);
	},
	default: (key: string) => {
		return defaultLocalstore[key];
	},
	defaultAll: () => {
		return defaultLocalstore;
	}
};
