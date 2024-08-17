<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import searchGet from '$lib/api/search/get';
	import { goto } from '$app/navigation';
	import userLookup from '$lib/api/user/lookup';
	import { JsonView } from '@zerodevx/svelte-json-view';
	import userGet from '$lib/api/user/get';
	import noteGet from '$lib/api/note/get';
	import Store from '$lib/utils/Store';

	let query;

	async function search() {
		await searchGet(query);
	}

	async function fetchAp() {
		let searchRes = {};

		let searchReq = await fetch(`/api/v2/fetch?q=${query}`, {
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
	<PageHeader title={locale('search')} icon="search" />
	<div class="pageContent">
		<div class="paddedPage">
			<Input
				type="wide"
				placeholder="Paste in a URL or type search query"
				bind:value={query}
			/>
			<Button on:click={search}>Search</Button>
			<Button on:click={fetchAp}>Fetch</Button>
		</div>
	</div>
</template>
