<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Note from '$lib/components/Note.svelte';

	export let data;
</script>

<template>
	<PageHeader title={locale('explore')} />
	<div class="pageContent">
		<div class="paddedPage">
			{#if data}
				{#each data as note}
					<Note data={note} />
				{/each}
			{/if}
		</div>
	</div>
</template>
