<script lang="ts">
	import PageSidebar from '$lib/components/PageSidebar.svelte';
	import queryClient from '$lib/queryclient';
	import { QueryClientProvider } from '@tanstack/svelte-query';
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
