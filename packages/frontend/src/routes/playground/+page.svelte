<script>
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Mfm from '$lib/components/Mfm.svelte';

	let mfmContent = '';
</script>

<template>
	<PageHeader title={locale('mfm_playground')} />
	<div class="pageContent">
		<strong>{locale('input')}:</strong><br />
		<textarea bind:value={mfmContent} />
		<br /><br />
		<strong>{locale('output')}:</strong><br />
		{#key mfmContent}
			<Mfm content={mfmContent} />
		{/key}
	</div>
</template>
