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
	import Tab from '$lib/components/Tab.svelte';

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
		<Tab
			icon="users"
			label={locale('tl_local')}
			selected={timeline === 'local' ? true : false}
			on:click={async () => {
				timeline = 'local';
				Store.set('explore_timeline', 'local');
				refresh();
			}}
		/>
		<Tab
			icon="planet"
			label={locale('tl_global')}
			selected={timeline === 'public' ? true : false}
			on:click={async () => {
				timeline = 'public';
				Store.set('explore_timeline', 'public');
				refresh();
			}}
		/>
		<hr class="vertical" />
		<Button type="header" on:click={async () => refresh()}>
			<Icon name="refresh" size="16px" />
		</Button>
	</PageHeader>
	<div class="pageContent hasTimeline">
		{#if notes && notes.length > 0}
			<div class="timeline">
				{#key notes}
					{#each notes as note}
						{#if note.type === 'note'}
							<Note data={note.object} inTimeline />
						{:else if note.type === 'repeat'}
							<Note
								data={note.object.note}
								repeat
								repeatData={note.object}
								inTimeline
							/>
						{/if}
					{/each}
				{/key}
			</div>
		{:else}
			<div class="loading">
				<Loading />
			</div>
		{/if}
	</div>
</template>
