import LocalStore from "$lib/LocalStore";
import Store from "$lib/Store";

if (LocalStore.get('debug')) {
    Store.subscribeAll();
}