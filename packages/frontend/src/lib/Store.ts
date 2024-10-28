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

    private subscriptionLogger(subscription: string, value: any) {
        console.debug('[store] '+subscription+': '+value)
    }

    public subscribeAll() {
        console.debug('[store] in debug mode, subscribed to all stores')

        appReload.subscribe((e) => {
            this.subscriptionLogger('appReload', e)
        })
        selfRefresh.subscribe((e) => {
            this.subscriptionLogger('selfRefresh', e)
        })
        viewRefresh.subscribe((e) => {
            this.subscriptionLogger('viewRefresh', e)
        })
        activeRequests.subscribe((e) => {
            this.subscriptionLogger('activeRequests', e)
        })
    }
}

export default new Store();