import { writable, type Writable } from 'svelte/store';

const appReload = writable(false);
const selfRefresh = writable(false);
const viewRefresh = writable(false);

const showCompose = writable(false);
const showDrive = writable(false);
const activeRequests = writable(0);

const draft_replyingTo = writable('');
const draft_repeat = writable('');

const alerts: Writable<any[]> = writable([]);
const selectedFiles: Writable<any[]> = writable([]);

class Store {
	public appReload = appReload; // full browser reload
	public selfRefresh = selfRefresh; // refresh self widgets
	public viewRefresh = viewRefresh; // refresh widgets, timeline, note or user page component

	public showCompose = showCompose;
	public showDrive = showDrive;
	public activeRequests = activeRequests;

	public draft_replyingTo = draft_replyingTo;
	public draft_repeat = draft_repeat;

	public alerts = alerts;
	public selectedFiles = selectedFiles;
}

export default new Store();
