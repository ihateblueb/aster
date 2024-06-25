<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { locale } from '$lib/locale';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Button from '$lib/components/Button.svelte';
	import Ad from '$lib/components/Ad.svelte';
	import Store from '$lib/utils/Store';

	export let data;
</script>

<template>
	{#if Store.get('a_token')}
		<PageHeader title={locale('home')} />
		<div class="pageContent">
			<div class="paddedPage">
				<p>
					This is filler content. Soon, a timeline of sorts will be
					here.
				</p>
			</div>
		</div>
	{:else}
		<PageHeader title={locale('welcome')} />
		<div class="pageContent">
			<div class="paddedPage welcomePage">
				<h1>{data.name}</h1>
				<span class="version"
					>{locale('running')} {data.software} v{data.version}</span
				>
				<div class="statsCtn">
					<div class="stat">
						{data.local_user_count}
						{locale('user')}
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
				<p><Mfm content={data.description} /></p>
				<h2>{locale('instance_rules')}</h2>
				<ol>
					{#each data.rules as rule}
						<li>{rule}</li>
					{/each}
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
</style>
