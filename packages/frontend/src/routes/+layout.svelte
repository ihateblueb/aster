<script>
	import { page } from '$app/stores';
</script>

<div class="page">
	<main>
		<div class="pageHeader">
			<!--
			<Button type="header" on:click={() => history.back()}>
				<Icon name="arrow-left" />
			</Button>
			-->
			<p>Page</p>
		</div>
		<div class="pageContent">
			<slot></slot>
		</div>
	</main>
</div>

<style lang="scss" global>
	// this may say its imported incorrectly but Its Fine
	@import '../app';
</style>
