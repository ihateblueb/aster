import localstore from '$lib/utils/localstore';

export class http {
	public async get(endpoint) {
		const response = await fetch(endpoint, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localstore.get('a_token')}`
			}
		});
		const data = await response.json();
		return data;
	}

	public async post(endpoint, body?) {
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

		return response;
	}

	public async patch(endpoint, body) {
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

		return response;
	}

	public async delete(endpoint, body?) {
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

		return response;
	}
}
