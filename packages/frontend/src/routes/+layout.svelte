<script lang="ts">
	import PageSidebar from '$lib/components/PageSidebar.svelte';
	import { Router } from 'svelte-navigator';
</script>

<PageSidebar />
<main>
	<slot />
</main>
<PageSidebar />

<style lang="scss" global>
	@use '../app.scss';
</style>
