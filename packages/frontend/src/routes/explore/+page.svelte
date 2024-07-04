<script lang="ts">
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Note from '$lib/components/Note.svelte';
	import timelineGet from '$lib/api/timeline/get';
	import Button from '$lib/components/Button.svelte';

	let timeline = 'global';
</script>

<template>
	<PageHeader title={locale('explore')} />
	<div class="pageContent">
		<div class="paddedPage">
			<div class="timelineSelect">
				<Button type="wide" on:click={() => (timeline = 'global')}
					>Global</Button
				>
				<Button type="wide" on:click={() => (timeline = 'local')}
					>Local</Button
				>
			</div>
			{#if timeline === 'global'}
				{#await timelineGet('public') then notes}
					<span>tl length {notes.length}</span>
					{#each notes as note}
						<Note data={note} />
					{/each}
				{/await}
			{:else if timeline === 'local'}
				{#await timelineGet('local') then notes}
					<span>tl length {notes.length}</span>
					{#each notes as note}
						<Note data={note} />
					{/each}
				{/await}
			{:else}
				no timeline selected
			{/if}
		</div>
	</div>
</template>

<style lang="scss">
	.timelineSelect {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
</style>
