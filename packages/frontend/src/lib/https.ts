import Store from './store';
import localstore from './localstore';

class ApiError extends Error {
	constructor(
		public status: number,
		public message: string
	) {
		super();
		Object.setPrototypeOf(this, ApiError.prototype);
		this.name = 'ApiError';
		this.status = status ?? 0;
	}
}

class https {
	private count(num: number) {
		let count = Store.activeRequests;
		count.update((e) => e + num);
	}

	private async start() {
		this.count(1);
	}
	private async end(res: Response) {
		this.count(-1);

		let apiRes = undefined;
		try {
			apiRes = await res.json();
		} catch {}

		if (!res.ok)
			throw new ApiError(
				res.status,
				apiRes?.message ?? 'Something went wrong'
			);

		console.log(apiRes);

		return apiRes ?? undefined;
	}

	public async get(url: string, auth?: boolean) {
		await this.start();

		let req = await fetch(url, {
			method: 'GET',
			headers: auth
				? {
						Authorization: 'Bearer ' + localstore.get('token')
					}
				: {}
		});

		return await this.end(req);
	}
	public async post(url: string, body?: any, raw?: boolean) {
		await this.start();

		let req = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + localstore.get('token')
			},
			body: raw ? body : JSON.stringify(body)
		});

		return await this.end(req);
	}
	public async patch(url: string) {
		await this.start();

		let req = await fetch(url, {
			method: 'PATCH',
			headers: {
				Authorization: 'Bearer ' + localstore.get('token')
			}
		});

		return await this.end(req);
	}
	public async delete(url: string) {
		await this.start();

		let req = await fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + localstore.get('token')
			}
		});

		return await this.end(req);
	}
}

export default new https();
