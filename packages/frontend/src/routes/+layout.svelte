<script lang="ts">
	import PageSidebar from '$lib/components/PageSidebar.svelte';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<PageSidebar />
	<main>
		<slot />
	</main>
	<PageSidebar />
</QueryClientProvider>

<style lang="scss" global>
	@use '../app.scss';
</style>
