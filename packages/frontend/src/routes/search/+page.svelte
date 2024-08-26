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
	import localstore from '$lib/utils/localstore';

	let query;
	let results = {};

	async function search() {
		results = await searchGet(query);
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
			<br />
			{#key results}
				{#if results}
					{#if results.results && results.results.length > 0}
						{#each results.results as result}
							<p>Matched by <b>{result.by}</b></p>
							{#if result.type === 'note'}
								<JsonView json={result} />
							{:else if result.type === 'user'}
								<JsonView json={result} />
							{:else}
								<JsonView json={result} />
							{/if}
						{/each}
					{/if}
				{/if}
			{/key}
		</div>
	</div>
</template>
