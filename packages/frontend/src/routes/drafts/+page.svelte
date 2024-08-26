<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import localstore from '$lib/utils/localstore';
	import { JsonView } from '@zerodevx/svelte-json-view';

	let data = JSON.parse(localstore.get('drafts'));
</script>

<template>
	<PageHeader title={locale('drafts')} icon="pencil-minus" />
	<div class="pageContent">
		<div class="paddedPage">
			{#if data}
				<JsonView json={data} />
			{/if}
		</div>
	</div>
</template>

<style lang="scss">
	.draft {
	}
</style>
