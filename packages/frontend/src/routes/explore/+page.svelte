<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<template>
	<PageHeader title={locale('explore')} />
	<div class="pageContent">
		<div class="paddedPage"></div>
	</div>
</template>
