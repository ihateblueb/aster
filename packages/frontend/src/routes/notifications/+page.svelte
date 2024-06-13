<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';

	export let data;
</script>

<svelte:head>
	<title>{locale('notifications')}</title>
</svelte:head>

<template>
	<PageHeader title={locale('notifications')} />
	<div class="pageContent">
		<div class="paddedPage"></div>
	</div>
</template>
