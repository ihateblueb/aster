<script lang="ts">
	import { onMount } from 'svelte';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Note from '$lib/components/Note.svelte';
	import timelineGet from '$lib/api/timeline/get';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Loading from '$lib/components/Loading.svelte';

	let timeline = 'public';
	let notes;

	onMount(async () => {
		notes = undefined;
		notes = await timelineGet(timeline);
	});

	async function refresh() {
		notes = undefined;
		notes = await timelineGet(timeline);
	}
</script>

<template>
	<PageHeader title={locale('explore')} icon="compass">
		<Button type="header" on:click={async () => refresh()}>
			<Icon name="refresh" size="18px" />
		</Button>
	</PageHeader>
	<div class="pageContent">
		<div class="paddedPage">
			<div class="timelineSelect">
				<Button
					type="wide"
					on:click={async () => {
						timeline = 'public';
						refresh();
					}}>Global</Button
				>
				<Button
					type="wide"
					on:click={async () => {
						timeline = 'local';
						refresh();
					}}>Local</Button
				>
			</div>
			<div class="timeline">
				{#if notes && notes.length > 0}
					{#key notes}
						{#each notes as note}
							<Note data={note} margin={false} />
						{/each}
					{/key}
				{:else}
					<div class="loading">
						<Loading />
					</div>
				{/if}
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.loading {
		display: flex;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		padding: 25px;
	}
	.timeline {
		display: grid;
		grid-template-columns: 100%;
		gap: 10px;
		margin-top: 10px;
	}
	.timelineSelect {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
</style>
