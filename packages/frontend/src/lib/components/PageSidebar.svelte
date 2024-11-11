<script>
	import Compose from '$lib/components/Compose.svelte';
</script>

<div class="pageSidebar">
	<div class="body">
		<div class="top">
			<Compose />
			<Compose />
			<Compose />
			<Compose />
		</div>
		<div class="bottom">
			<Compose />
		</div>
	</div>
</div>

<style lang="scss">
	.pageSidebar {
		display: flex;

		width: 350px;
		max-width: 350px;

		.body {
			display: flex;
			flex-direction: column;
			gap: 10px;

			width: 100%;
			margin-top: 38px;
			padding: 12px 16px;
			height: calc((100vh - 38px) - (12px * 2));

			.top {
				display: flex;
				flex-direction: column;
				gap: 10px;

				margin-bottom: auto;
				top: 0;

				overflow-y: scroll;
			}

			.bottom {
				display: flex;
				flex-direction: column;
				gap: 10px;

				margin-top: auto;
				bottom: 0;
			}
		}
	}
</style>
