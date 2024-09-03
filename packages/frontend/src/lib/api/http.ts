import localstore from '$lib/utils/localstore';
import store from '$lib/utils/store';

let activeRequests = 0;

export class http {
	private activeRequestsCount(change: number) {
		activeRequests = activeRequests + change;
		store.activeRequests.set(activeRequests);
	}

	public async get(endpoint) {
		this.activeRequestsCount(1);

		const response = await fetch(endpoint, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localstore.get('a_token')}`
			}
		});
		const data = await response.json();

		this.activeRequestsCount(-1);
		return data;
	}

	public async post(endpoint, body?) {
		this.activeRequestsCount(1);

		let response = {};

		if (typeof body === 'object') {
			body = JSON.stringify(body);
		}

		let request = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${localstore.get('a_token')}`
			},
			body: body
		});

		response = await request.json();

		if (request.status !== 200) {
			console.log(response);
		}

		this.activeRequestsCount(-1);
		return response;
	}

	public async patch(endpoint, body) {
		this.activeRequestsCount(1);

		let response = {};

		let request = await fetch(endpoint, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${localstore.get('a_token')}`
			},
			body: JSON.stringify(body)
		});

		response = await request.json();

		if (request.status !== 200) {
			console.log(response);
		}

		this.activeRequestsCount(-1);

		return response;
	}

	public async delete(endpoint, body?) {
		this.activeRequestsCount(1);

		let response = {};

		let request = await fetch(endpoint, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${localstore.get('a_token')}`
			},
			body: JSON.stringify(body)
		});

		response = await request.json();

		if (request.status !== 200) {
			console.log(response);
		}

		this.activeRequestsCount(-1);

		return response;
	}
}
