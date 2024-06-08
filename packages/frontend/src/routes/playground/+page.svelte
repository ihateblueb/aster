<script>
	import { page } from '$app/stores';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Mfm from '$lib/components/Mfm.svelte';

	let mfmContent = '';
</script>

<svelte:head>
	<title>MFM Playground</title>
</svelte:head>

<template>
	<PageHeader title="MFM Playground" />
	<div class="pageContent">
		<strong>Input:</strong><br />
		<textarea bind:value={mfmContent} />
		<br /><br />
		<strong>Output:</strong><br />
		{#key mfmContent}
			<Mfm content={mfmContent} />
		{/key}
	</div>
</template>
