import { writable } from 'svelte/store';

const appReload = writable(false);
const selfRefresh = writable(false);
const viewRefresh = writable(false);
const activeRequests = writable(0);
const draft_replyingTo = writable('');
const draft_repeat = writable('');

class Store {
	public appReload = appReload; // full browser reload
	public selfRefresh = selfRefresh; // refresh self widgets
	public viewRefresh = viewRefresh; // refresh widgets, timeline, note or user page component
	public activeRequests = activeRequests;

	public draft_replyingTo = draft_replyingTo;
	public draft_repeat = draft_repeat;
}

export default new Store();
