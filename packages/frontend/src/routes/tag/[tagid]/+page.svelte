<script>
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Note from '$lib/components/Note.svelte';

	export let data;
</script>

<template>
	<PageHeader title={'#' + $page.params.tagid} />
	<div class="pageContent">
		<span>tl length {data.length}</span>
		{#key data}
			{#if data}
				{#each data as note}
					<Note data={note} />
				{/each}
			{/if}
		{/key}
	</div>
</template>
