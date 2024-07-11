<script lang="ts">
	import { onMount } from 'svelte';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Note from '$lib/components/Note.svelte';
	import timelineGet from '$lib/api/timeline/get';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import VirtualList from '$lib/components/VirtualList.svelte';

	let timeline = 'local';
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
		<Button
			type={'header' + (timeline === 'local' ? ' selected' : '')}
			on:click={async () => {
				timeline = 'local';
				refresh();
			}}
		>
			<Icon name="users" size="16px" />
		</Button>
		<Button
			type={'header' + (timeline === 'public' ? ' selected' : '')}
			on:click={async () => {
				timeline = 'public';
				refresh();
			}}
		>
			<Icon name="planet" size="16px" />
		</Button>
		<hr class="vertical" />
		<Button type="header" on:click={async () => refresh()}>
			<Icon name="refresh" size="16px" />
		</Button>
	</PageHeader>
	<div class="pageContent hasTimeline">
		{#if notes && notes.length > 0}
			{#key notes}
				<VirtualList
					height="calc(100vh - 45px)"
					timeline
					items={notes}
					let:item
				>
					<Note data={item} inTimeline />
				</VirtualList>
			{/key}
		{:else}
			<div class="loading">
				<Loading />
			</div>
		{/if}
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
</style>
