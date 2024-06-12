<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<svelte:head>
	<title>{locale('admin_panel')}</title>
</svelte:head>

<template>
	<PageHeader title={locale('admin_panel')} />
	<div class="pageContent">
		<div class="paddedPage"></div>
	</div>
</template>
