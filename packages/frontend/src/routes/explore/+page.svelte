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
	import Store from '$lib/utils/Store';

	let timeline = Store.get('explore_timeline')
		? Store.get('explore_timeline')
		: 'local';
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
				Store.set('explore_timeline', 'local');
				refresh();
			}}
		>
			<Icon name="users" size="16px" />
		</Button>
		<Button
			type={'header' + (timeline === 'public' ? ' selected' : '')}
			on:click={async () => {
				timeline = 'public';
				Store.set('explore_timeline', 'public');
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
				<VirtualList height="100%" timeline items={notes} let:item>
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
