<script lang="ts">
	import localstore from '$lib/localstore';
	import store from '$lib/store.js';
	import Button from '$lib/components/Button.svelte';
	import { IconLogin, IconUserPlus } from '@tabler/icons-svelte';

	let self;

	function updateSelf() {
		let grabbedSelf = localstore.get('self');

		if (grabbedSelf) {
			self = grabbedSelf;
		}
	}

	updateSelf();

	store.selfRefresh.subscribe((e) => {
		updateSelf();
	});
</script>

<div class="accountWidget">
	{#if self}
		Account
	{:else}
		<div class="btns">
			<Button to="/login" accent centered wide nm>
				<IconLogin size="var(--fs-lg)" />
				Login
			</Button>
			<Button to="/register" secondary centered wide nm>
				<IconUserPlus size="var(--fs-lg)" />
				Register
			</Button>
		</div>
	{/if}
</div>

<style lang="scss" scoped>
	.accountWidget {
		.btns {
			display: flex;
			align-items: center;
			gap: 10px;
		}
	}
</style>
