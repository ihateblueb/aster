export const prerender = false;
export const ssr = false;

import LocalStore from '$lib/LocalStore';
import Store from '$lib/Store';

if (LocalStore.get('debug')) {
	Store.subscribeAll();
}
