<script>
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<template>
	<div class="page">
		<Sidebar />
		<main>
			<slot></slot>
		</main>
		<Sidebar />
	</div>
</template>

<style lang="scss" global>
	// this may say its imported incorrectly but Its Fine
	@import '../app';
</style>
