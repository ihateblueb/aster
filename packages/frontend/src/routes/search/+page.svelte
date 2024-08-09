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

	let query;
	let user;
	let note;

	async function search() {
		let searchRes = await searchGet(query);
		if (searchRes.type === 'user') {
			user = await userGet('searchRes.id');
		} else if (searchRes.type === 'note') {
			user = await noteGet('searchRes.id');
		} else if (searchRes.type === 'lookup') {
			goto(query);
		}
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
			{#key user}
				{#if user}
					<JsonView json={user} />
				{/if}
			{/key}
			{#key note}
				{#if note}
					<JsonView json={note} />
				{/if}
			{/key}
		</div>
	</div>
</template>
