export default {
	set: (key: string, val: string) => {
		localStorage.setItem(key, val);
	},
	get: (key: string) => {
		localStorage.getItem(key);
	},
	del: (key: string) => {
		localStorage.removeItem(key);
	}
};
