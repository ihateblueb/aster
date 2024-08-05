<script>
	import InfoBox from '$lib/components/InfoBox.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	import { JsonView } from '@zerodevx/svelte-json-view';

	export let data;
</script>

<template>
	<PageHeader title={data.data.id} icon="code" />
	<div class="pageContent">
		<div class="paddedPage">
			<InfoBox type="warn">
				This information was just fetched from the instance it's from,
				and may not match what's stored on this one.
			</InfoBox>
		</div>
		<div class="raw _W43nW29">
			<JsonView json={data.data} />
		</div>
	</div>
</template>
