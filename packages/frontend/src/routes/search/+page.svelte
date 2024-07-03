<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import searchGet from '$lib/api/search/get';
	import { goto } from '$app/navigation';
	import userLookup from '$lib/api/user/lookup';

	let query;

	async function search() {
		let searchRes = await searchGet(query);
		if (searchRes.type === 'user') {
			goto(`users/${searchRes.id}`);
		} else if (searchRes.type === 'note') {
			goto(`notes/${searchRes.id}`);
		} else if (searchRes.type === 'lookup') {
			goto(query);
		}
	}
</script>

<template>
	<PageHeader title={locale('search')} />
	<div class="pageContent">
		<div class="paddedPage">
			<Input
				type="wide"
				placeholder="Paste in a URL or type search query"
				bind:value={query}
			/>
			<Button on:click={search}>Search</Button>
		</div>
	</div>
</template>
