<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<template>
	<PageHeader title={locale('drafts')} icon="pencil-minus" />
	<div class="pageContent">
		<div class="paddedPage"></div>
	</div>
</template>
