<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<svelte:head>
	<title>{locale('announcements')}</title>
</svelte:head>

<template>
	<PageHeader title={locale('announcements')} />
	<div class="pageContent">
		<div class="paddedPage"></div>
	</div>
</template>
