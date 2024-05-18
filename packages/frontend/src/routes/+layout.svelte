<script>
	import { page } from '$app/stores';
</script>

<div class="page">
	<main>
		<slot></slot>
	</main>
</div>

<style lang="scss" global>
	// this may say its imported incorrectly but Its Fine
	@import '../app';
</style>
