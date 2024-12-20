<script>
	import WidgetBase from '$lib/components/WidgetBase.svelte';
	import Compose from '$lib/components/Compose.svelte';
	import Button from '$lib/components/Button.svelte';
	import { IconPencil } from '@tabler/icons-svelte';
	import store from '$lib/store';
</script>

<div class="box">
	<WidgetBase transparent>
		<Compose />
	</WidgetBase>
</div>
<div class="btn">
	<Button accent circle nm on:click={() => store.showCompose.set(true)}>
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
