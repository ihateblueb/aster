import LocalStore from "./LocalStore";
import Store from "./Store";


class https {
    private count(num: number) {
        // changed in svelte 5 or do i just not remember how to do this?
        // i dont think this is correct
        let count = Store.activeRequests
        count.update(() => num);
    }

    public async get(url: string, auth?: boolean) {
        this.count(1);

        let req = await fetch(url, {
            method: 'GET',
            headers: auth ? {
                Authorization: 'Bearer ' + LocalStore.get('token')
            } : {}
        })

        this.count(-1);
    }
    public async post(url: string) {
        this.count(1);

        let req = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + LocalStore.get('token')
            }
        })
        
        this.count(-1);
    }
    public async patch(url: string) {
        this.count(1);

        let req = await fetch(url, {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + LocalStore.get('token')
            }
        })
        
        this.count(-1);
    }
    public async delete(url: string) {
        this.count(1);

        let req = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + LocalStore.get('token')
            }
        })
        
        this.count(-1);
    }
}

export default new https();