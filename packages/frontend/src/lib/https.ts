import LocalStore from './localstore';
import Store from './store';

class https {
	private count(num: number) {
		let count = Store.activeRequests;
		count.update((e) => e + num);
	}

	public async get(url: string, auth?: boolean) {
		this.count(1);

		let req = await fetch(url, {
			method: 'GET',
			headers: auth
				? {
						Authorization: 'Bearer ' + LocalStore.get('token')
					}
				: {}
		});

		this.count(-1);

		return {
			status: req.status,
			res: await req.json()
		};
	}
	public async post(url: string) {
		this.count(1);

		let req = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + LocalStore.get('token')
			}
		});

		this.count(-1);

		return req.json();
	}
	public async patch(url: string) {
		this.count(1);

		let req = await fetch(url, {
			method: 'PATCH',
			headers: {
				Authorization: 'Bearer ' + LocalStore.get('token')
			}
		});

		this.count(-1);

		return req.json();
	}
	public async delete(url: string) {
		this.count(1);

		let req = await fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + LocalStore.get('token')
			}
		});

		this.count(-1);

		return req.json();
	}
}

export default new https();
