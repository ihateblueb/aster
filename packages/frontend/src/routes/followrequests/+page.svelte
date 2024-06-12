<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<svelte:head>
	<title>{locale('follow_requests')}</title>
</svelte:head>

<template>
	<PageHeader title={locale('follow_requests')} />
	<div class="pageContent">
		<div class="paddedPage"></div>
	</div>
</template>
