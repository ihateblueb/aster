import { writable } from 'svelte/store';

const appReload = writable(false);
const selfRefresh = writable(false);
const viewRefresh = writable(false);
const activeRequests = writable(0);
const draft_replyingTo = writable('');

class Store {
	public appReload = appReload; // full browser reload
	public selfRefresh = selfRefresh; // refresh self widgets
	public viewRefresh = viewRefresh; // refresh widgets, timeline, note or user page component
	public activeRequests = activeRequests;

	public draft_replyingTo = draft_replyingTo;
}

export default new Store();
