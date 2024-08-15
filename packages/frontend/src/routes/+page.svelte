<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { locale } from '$lib/locale';

	import VirtualList from '$lib/components/VirtualList.svelte';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Button from '$lib/components/Button.svelte';
	import Ad from '$lib/components/Ad.svelte';
	import Store from '$lib/utils/Store';
	import pkg from '../../../../package.json';
	import Icon from '$lib/components/Icon.svelte';

	import timelineGet from '$lib/api/timeline/get';
	import Note from '$lib/components/Note.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import SelectItem from '$lib/components/SelectItem.svelte';

	let timeline = Store.get('home_timeline');
	let notes;
	let loadingMore = false;

	async function refresh() {
		notes = undefined;
		notes = await timelineGet(timeline);
	}

	async function fetchMore() {
		console.log(timeline);
		console.log(notes.at(-1).object.created_at);
		console.log(notes);

		let newNotes = await timelineGet(
			timeline,
			notes.at(-1).object.created_at
		);
		newNotes.forEach((e) => {
			notes = [...notes, e];
		});

		console.log(notes);
	}

	onMount(async () => {
		refresh();
	});

	function actionWhenInViewport(e) {
		const observer = new IntersectionObserver(async (entries) => {
			if (entries[0].isIntersecting) {
				loadingMore = true;
				await fetchMore();
				loadingMore = false;
			}
		});

		observer.observe(e);
	}

	export let data;
</script>

<template>
	{#if Store.get('a_token')}
		<PageHeader
			title={locale('home')}
			icon={timeline === 'home'
				? 'home'
				: timeline === 'local'
					? 'users'
					: timeline === 'bubble'
						? 'chart-bubble'
						: timeline === 'public'
							? 'planet'
							: ''}
		>
			<Button
				type={'header' + (timeline === 'home' ? ' selected' : '')}
				on:click={async () => {
					timeline = 'home';
					Store.set('home_timeline', 'home');
					refresh();
				}}
			>
				<Icon name="home" size="16px" />
			</Button>
			<Button
				type={'header' + (timeline === 'local' ? ' selected' : '')}
				on:click={async () => {
					timeline = 'local';
					Store.set('home_timeline', 'local');
					refresh();
				}}
			>
				<Icon name="users" size="16px" />
			</Button>
			<Button
				type={'header' + (timeline === 'bubble' ? ' selected' : '')}
				on:click={async () => {
					timeline = 'bubble';
					Store.set('home_timeline', 'bubble');
					refresh();
				}}
			>
				<Icon name="chart-bubble" size="16px" />
			</Button>
			<Button
				type={'header' + (timeline === 'public' ? ' selected' : '')}
				on:click={async () => {
					timeline = 'public';
					Store.set('home_timeline', 'public');
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
		<div class="pageContent">
			{#if notes && notes.length > 0}
				<div class="paddedPage">
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
					<div use:actionWhenInViewport />
					{#if loadingMore}
						<div class="loading">
							<Loading />
						</div>
					{/if}
				</div>
			{:else}
				<div class="paddedPage">
					<div class="loading">
						<Loading />
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<PageHeader title={locale('welcome')} icon="heart" />
		<div class="pageContent">
			<div class="paddedPage welcomePage">
				<h1>{data.name}</h1>
				<span class="version"
					>{locale('running')} {locale('aster')} v{pkg.version}</span
				>
				<div class="statsCtn">
					<div class="stat">
						{data.local_user_count}
						{locale('users')}
					</div>
					<div class="stat">
						{data.local_note_count}
						{locale('notes')}
					</div>
					<div class="stat">
						{data.instance_count}
						{locale('instances')}
					</div>
				</div>
				<p>
					{#if data.description}
						<Mfm content={data.description} />
					{/if}
				</p>
				<h2>{locale('instance_rules')}</h2>
				<ol>
					{#if data.rules}
						{#each data.rules as rule}
							<li>{rule}</li>
						{/each}
					{/if}
				</ol>
				<h2>{locale('advertisement')}</h2>
				<Ad />
			</div>
		</div>
	{/if}
</template>

<style lang="scss">
	.welcomePage {
		h1 {
			margin-bottom: 0px;
		}
		.version,
		p {
			margin-bottom: 10px;
		}
		.version {
			display: block;
			font-size: var(--font-l);
			font-weight: 400;
			opacity: 75%;
		}
		ol,
		ul {
			margin: 6px 0;
			padding-left: 30px;
		}
		li {
			padding: 2px 0;
		}
		.statsCtn {
			display: flex;
			gap: 10px;
			justify-content: space-around;
			margin-bottom: 10px;

			.stat {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				padding: 8px 12px;
				color: var(--accent);
				background-color: var(--accent-20);
				border-radius: var(--border-m);
			}
		}
	}
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
