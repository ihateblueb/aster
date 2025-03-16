import getUser from '$lib/api/user/get';
import store from '$lib/store';
import localstore from '$lib/localstore';
import getEmojis from '$lib/api/emojis/get';

export const prerender = false;
export const ssr = false;

store.appReload.subscribe((e) => {
	if (e) {
		location.reload();
	}
});

let self = localstore.getParsed('self');

if (self) {
	getUser(self.id)
		.then((self) => {
			localstore.set('self', JSON.stringify(self));
		})
		.catch((err) => {
			console.log('failed to fetch new self');
			console.error(err);
		});
}

getEmojis()
	.then((emojis) => {
		localstore.set('emojis', JSON.stringify(emojis));
	})
	.catch((err) => {
		console.log('failed to fetch new emojis');
		console.error(err);
	});
