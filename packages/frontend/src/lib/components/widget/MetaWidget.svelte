<script lang="ts">
	import getMeta from '$lib/api/meta/get';
	import { createQuery } from '@tanstack/svelte-query';
	import { IconTrash } from '@tabler/icons-svelte';
	import LocalizedString from '$lib/components/LocalizedString.svelte';

	const query = createQuery({
		queryKey: ['meta'],
		retry: false,
		refetchOnWindowFocus: false,
		staleTime: 60000,
		queryFn: async () => await getMeta()
	});
</script>

<div class="meta">
	{#if $query.isSuccess}
		<p>
			{$query.data?.software ?? 'aster'}
			{$query.data?.version ?? 'unknown version'}
		</p>
		<p class="links">
			<a href="/about">
				<LocalizedString id="about" />
			</a>
			<a href="/source">
				<LocalizedString id="source-code" />
			</a>
			<a href="steam://rungameid/220">_</a>
		</p>
	{/if}
</div>

<style lang="scss" scoped>
	p {
		opacity: 75%;
		word-break: break-word;

		&.links {
			display: flex;
			gap: 6px;
		}
	}

	@media (max-width: 1355px) {
		.meta {
			display: none;
		}
	}
</style>
