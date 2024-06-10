export default {
	set: (key: string, val: string) => {
		return localStorage.setItem(key, val);
	},
	get: (key: string) => {
		let toReturn = localStorage.getItem(key);
		if (toReturn) {
			return toReturn;
		} else {
			return import(`./defaultStore.json`)[key];
		}
	},
	del: (key: string) => {
		return localStorage.removeItem(key);
	}
};
