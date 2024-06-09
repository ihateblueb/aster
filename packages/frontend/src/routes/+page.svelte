<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';

	export let data;
</script>

<template>
	<PageHeader title="Welcome" />
	<div class="pageContent">
		<div class="paddedPage welcomePage">
			<h1>{data.name}</h1>
			<span class="version">running {data.software} v{data.version}</span>
			<div class="statsCtn">
				<div class="stat">
					{data.stats.local_user_count} users
				</div>
				<div class="stat">
					{data.stats.local_note_count} notes
				</div>
				<div class="stat">
					{data.stats.instance_count} instances
				</div>
			</div>
			<p><Mfm content={data.description} /></p>
			<h2>Instance Rules</h2>
			<ol>
				{#each data.rules as rule}
					<li>{rule}</li>
				{/each}
			</ol>
		</div>
	</div>
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
