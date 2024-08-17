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
</script>

<template>
	<div class="pageContent">
		<div class="paddedPage textMargins">
			<h2>{locale('search')}</h2>
			<h3>Sonic</h3>
			<p>
				Only run this if there's already notes on this instance before
				enabling Sonic search
			</p>
			<Button on:click={() => indexAll()}>Index all notes</Button>
		</div>
	</div>
</template>
