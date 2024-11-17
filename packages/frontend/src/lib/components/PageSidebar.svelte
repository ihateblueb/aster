<script>
	import ComposeWidget from '$lib/components/widget/ComposeWidget.svelte';
	import AccountWidget from '$lib/components/widget/AccountWidget.svelte';
	import DevelopmentWidget from '$lib/components/widget/DevelopmentWidget.svelte';
</script>

<div class="pageSidebar">
	<div class="body">
		<div class="top">
			<ComposeWidget />
			<DevelopmentWidget />
		</div>
		<div class="bottom">
			<AccountWidget />
		</div>
	</div>
</div>

<style lang="scss">
	@media (max-width: 750px) {
		.pageSidebar {
			max-width: none !important;
			display: none;
		}
	}

	@media (max-width: 1355px) {
		.pageSidebar {
			max-width: 75px;
		}
	}

	.pageSidebar {
		.body {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			gap: 10px;

			margin-top: 38px;
			padding: 12px;
			height: calc((100vh - 38px));

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
