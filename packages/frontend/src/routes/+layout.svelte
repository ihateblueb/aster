<script lang="ts">
	import localStore from '$lib/LocalStore';
	import PageSidebar from '$lib/components/PageSidebar.svelte';
</script>

<div class="app">
	<PageSidebar />
	<main>
		<slot />
	</main>
	<PageSidebar />
</div>

<style lang="scss" global>
	@use '../app.scss';
</style>
