import { writable } from 'svelte/store';

const appReload = writable(false);
const selfRefresh = writable(false);
const viewRefresh = writable(false);
const activeRequests = writable(0);

class Store {
	public appReload = appReload; // full browser reload
	public selfRefresh = selfRefresh; // refresh self widgets
	public viewRefresh = viewRefresh; // refresh widgets, timeline, note or user page component
	public activeRequests = activeRequests;

	private subscriptionLogger(subscription: string, value: any) {
		console.debug('[store] ' + subscription + ': ' + value);
	}

	public subscribeAll() {
		console.debug('[store] in debug mode, subscribed to all stores');

		appReload.subscribe((e) => {
			this.subscriptionLogger('appReload', e);
		});
		selfRefresh.subscribe((e) => {
			this.subscriptionLogger('selfRefresh', e);
		});
		viewRefresh.subscribe((e) => {
			this.subscriptionLogger('viewRefresh', e);
		});
		activeRequests.subscribe((e) => {
			this.subscriptionLogger('activeRequests', e);
		});
	}
}

export default new Store();
