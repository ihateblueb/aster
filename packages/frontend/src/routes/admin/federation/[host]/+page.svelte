<script>
	import Loading from '$lib/components/Loading.svelte';
	import { JsonView } from '@zerodevx/svelte-json-view';
	import Mfm from '$lib/components/Mfm.svelte';

	export let data;
</script>

<template>
	<div class="pageContent">
		<div class="paddedPage textMargins">
			{#await data}
				<div class="loading">
					<Loading />
				</div>
			{:then data}
				{#if data}
					<h2>{data.name ? data.name : data.host}</h2>
					{#if data.description}
						<p>
							<Mfm content={data.description} />
						</p>
					{/if}
					<JsonView json={data} />
				{/if}
			{/await}
		</div>
	</div>
</template>

<style lang="scss">
</style>
