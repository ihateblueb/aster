import { writable, type Writable } from 'svelte/store';

const appReload = writable(false);
const selfRefresh = writable(false);
const viewRefresh = writable(false);

const showCompose = writable(false);
const activeRequests = writable(0);

const draft_replyingTo = writable('');
const draft_repeat = writable('');

const websocket: Writable<WebSocket | undefined> = writable();

class Store {
	public appReload = appReload; // full browser reload
	public selfRefresh = selfRefresh; // refresh self widgets
	public viewRefresh = viewRefresh; // refresh widgets, timeline, note or user page component

	public showCompose = showCompose;
	public activeRequests = activeRequests;

	public draft_replyingTo = draft_replyingTo;
	public draft_repeat = draft_repeat;

	public websocket = websocket;
}

export default new Store();
