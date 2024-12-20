<script lang="ts">
	import getMeta from '$lib/api/meta/get';
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery({
		queryKey: ['meta'],
		retry: false,
		queryFn: async () => await getMeta()
	});
</script>

<div class="meta">
	{#if $query.isSuccess}
		<p>
			{$query.data?.software ?? 'aster'}
			{$query.data?.version ?? 'unknown version'}
		</p>
		<p>
			<a href="/about">About</a> <a href="/source">Source code</a>
			<a>link</a>
		</p>
	{/if}
</div>

<style lang="scss" scoped>
	p {
		opacity: 75%;
		word-break: break-word;
	}

	@media (max-width: 1355px) {
		.meta {
			display: none;
		}
	}
</style>
