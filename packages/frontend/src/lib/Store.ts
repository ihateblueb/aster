import store from 'svelte/store';

const appReload = store.writable(false)
const selfRefresh = store.writable(false)
const viewRefresh = store.writable(false)
const activeRequests = store.writable(0)

class Store {
    public appReload = appReload // full browser reload
    public selfRefresh = selfRefresh // refresh self widgets
    public viewRefresh = viewRefresh // refresh widgets, timeline, note or user page component
    public activeRequests = activeRequests
}

export default new Store();