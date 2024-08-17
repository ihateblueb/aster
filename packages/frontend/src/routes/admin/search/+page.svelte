<script>
	import Button from '$lib/components/Button.svelte';
	import { locale } from '$lib/locale';
	import Store from '$lib/utils/Store';

	async function indexAll() {
		let searchRes = {};

		let searchReq = await fetch(`/api/v2/admin/sonic/index`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${Store.get('a_token')}`
			}
		});

		searchRes = await searchReq.json();

		if (searchReq.status === 200) {
			console.log(searchRes);
		} else {
			console.log(searchRes);
		}

		return searchRes;
	}

	async function flushAll() {
		let searchRes = {};

		let searchReq = await fetch(`/api/v2/admin/sonic/flush`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${Store.get('a_token')}`
			}
		});

		searchRes = await searchReq.json();

		if (searchReq.status === 200) {
			console.log(searchRes);
		} else {
			console.log(searchRes);
		}

		return searchRes;
	}
</script>

<template>
	<div class="pageContent">
		<div class="paddedPage textMargins">
			<h2>{locale('search')}</h2>
			<h3>Sonic</h3>
			<p>
				You only really need to index all notes this if there's already
				notes on this instance before enabling Sonic search or have
				flushed all notes. Otherwise this doesn't do anything
				noticeable.
			</p>
			<p>
				Depending on how many notes are on your instance, this may take
				a while.
			</p>
			<div class="buttons">
				<Button on:click={() => indexAll()}>Index all notes</Button>
				<Button on:click={() => flushAll()}>Flush all notes</Button>
			</div>
		</div>
	</div>
</template>
