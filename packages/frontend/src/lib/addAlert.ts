import playSound from '$lib/sounds.js';
import store from '$lib/store.js';

export default function (object: any, sound?: boolean) {
	if (!object.id) object.id = Math.random();

	console.log('pushing alert ' + object.id + ': ' + JSON.stringify(object));

	store.alerts.update((e) => {
		e.push(object);
		return e;
	});
	if (sound) playSound('notification');

	setTimeout(() => {
		store.alerts.update((e) => {
			return e.filter((e) => e.id !== object.id);
		});
	}, 5000);
}
