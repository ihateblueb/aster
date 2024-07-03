<script lang="ts">
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Note from '$lib/components/Note.svelte';
	import timelineGet from '$lib/api/timeline/get';
</script>

<template>
	<PageHeader title={locale('explore')} />
	<div class="pageContent">
		<div class="paddedPage">
			{#await timelineGet('public') then notes}
				{#each notes as note}
					<Note data={note} />
				{/each}
			{/await}
		</div>
	</div>
</template>
