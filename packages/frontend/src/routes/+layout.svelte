<script>
	import { page } from '$app/stores';
</script>

<template>
	<div class="page">
		<main>
			<slot></slot>
		</main>
	</div>
	<!-- authenticated -->
	<div></div>
</template>

<style lang="scss" global>
	// this may say its imported incorrectly but Its Fine
	@import '../app';
</style>
