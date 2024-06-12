<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<svelte:head>
	<title>{locale('drive')}</title>
</svelte:head>

<template>
	<PageHeader title={locale('drive')} />
	<div class="pageContent">
		<div class="paddedPage"></div>
	</div>
</template>
