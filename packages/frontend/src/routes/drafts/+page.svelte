<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<svelte:head>
	<title>{locale('drafts')}</title>
</svelte:head>

<template>
	<PageHeader title={locale('drafts')} />
	<div class="pageContent">
		<div class="paddedPage"></div>
	</div>
</template>
