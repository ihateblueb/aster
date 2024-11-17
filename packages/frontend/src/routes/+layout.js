import getUser from '$lib/api/user/get';
import Store from '$lib/store';
import localstore from '$lib/localstore';

export const prerender = false;
export const ssr = false;

Store.appReload.subscribe((e) => {
	if (e) {
		location.reload();
	}
});

let self = localstore.get('self');

if (self) {
	try {
		self = JSON.parse(self);
		getUser(self.id)
			.then((self) => {
				localstore.set('self', JSON.stringify(self));
			})
			.catch((err) => {
				console.log('failed to fetch new self');
				console.error(err);
			});
	} catch (err) {
		console.log('failed to parse self json when attempting to update self');
		console.error(err);
	}
}
