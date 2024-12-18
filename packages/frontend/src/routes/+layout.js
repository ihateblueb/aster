import getUser from '$lib/api/user/get';
import store from '$lib/store';
import localstore from '$lib/localstore';

export const prerender = false;
export const ssr = false;

store.appReload.subscribe((e) => {
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

/*
	todo: key events
	`p` should toggle compose modal
	`r`	should toggle viewRefresh store
*/
