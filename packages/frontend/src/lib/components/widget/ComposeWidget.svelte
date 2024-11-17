<script>
	import WidgetBase from '$lib/components/WidgetBase.svelte';
	import Compose from '$lib/components/Compose.svelte';
	import Button from '$lib/components/Button.svelte';
	import { IconPencil } from '@tabler/icons-svelte';
</script>

<div class="box">
	<WidgetBase>
		<Compose />
	</WidgetBase>
</div>
<div class="btn">
	<Button accent nav nm>
		<IconPencil size="var(--fs-lg)" />
	</Button>
</div>

<style lang="scss" scoped>
	@media (max-width: 1355px) {
		.box {
			display: none;
		}
		.btn {
			display: block !important;
		}
	}

	.btn {
		display: none;
	}
</style>
