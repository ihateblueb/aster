<script>
	import Store from '$lib/scripts/Store';

	let noteCw = '';
	let noteContent = '';

	let noteRes = {};

	async function sendNote() {
		var noteReq = await fetch(`/api/v1/note`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${Store.get('a_token')}`
			},
			body: JSON.stringify({
				cw: noteCw,
				content: noteContent
			})
		});

		noteRes = await noteReq.json();

		if (noteReq.status === 200) {
			console.log(noteRes);
		} else {
			console.log(noteRes);
		}
	}
</script>

<svelte:head>
	<title>Compose a note</title>
</svelte:head>

<template>
	<div class="pageContent">
		<div class="paddedPage">
			<input
				class="ipt"
				placeholder="Content warning"
				bind:value={noteCw}
			/>
			<textarea
				class="ipt"
				placeholder="What's on your mind?"
				bind:value={noteContent}
			/>
			<button class="btn" on:click={sendNote}>Note</button>
		</div>
	</div>
</template>
