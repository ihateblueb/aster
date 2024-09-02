<script lang="ts">
	import adGetRandom from '$lib/api/ad/getRandom';
</script>

<template>
	<div class="ad">
		{#await adGetRandom() then ad}
			<a href={ad.link}>
				<img src={ad.url} alt={ad.alt} />
			</a>
		{/await}
	</div>
</template>

<style lang="scss">
	.ad {
		img {
			border-radius: var(--border-s);
			width: 100%;
		}
	}
</style>
