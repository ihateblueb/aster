export const prerender = false;
export const ssr = false;

import LocalStore from '$lib/localstore';
import Store from '$lib/store';

if (LocalStore.get('debug')) {
	Store.subscribeAll();
}

Store.appReload.subscribe((e) => {
	if (e) {
		location.reload();
	}
});
