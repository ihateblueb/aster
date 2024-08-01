<script>
	import PageHeader from '$lib/components/PageHeader.svelte';

	import { JsonView } from '@zerodevx/svelte-json-view';

	export let data;
</script>

<template>
	<PageHeader title={data.data.id} icon="code" />
	<div class="pageContent">
		<div class="raw _W43nW29">
			<JsonView json={data.data} />
		</div>
	</div>
</template>
