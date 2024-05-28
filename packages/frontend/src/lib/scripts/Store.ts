export default {
	set: (key: string, val: string) => {
		return localStorage.setItem(key, val);
	},
	get: (key: string) => {
		return localStorage.getItem(key);
	},
	del: (key: string) => {
		return localStorage.removeItem(key);
	}
};
