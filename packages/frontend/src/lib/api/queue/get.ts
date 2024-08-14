export default async function queueGet() {
	let queueRes = {};

	let queueReq = await fetch(`/admin/queue/dashboard/api/queues`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	queueRes = await queueReq.json();

	if (queueReq.status === 200) {
		console.log(queueRes);
	} else {
		console.log(queueRes);
	}

	return queueRes;
}
