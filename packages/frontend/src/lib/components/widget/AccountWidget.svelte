<script lang="ts">
	import localstore from '$lib/localstore';
	import store from '$lib/store.js';
	import Button from '$lib/components/Button.svelte';
	import { IconLogin, IconUserPlus } from '@tabler/icons-svelte';
	import Avatar from '$lib/components/Avatar.svelte';

	let self;

	function updateSelf() {
		let grabbedSelf = localstore.get('self');

		if (grabbedSelf) {
			self = JSON.parse(grabbedSelf);
		}
	}

	updateSelf();

	store.selfRefresh.subscribe((e) => {
		updateSelf();
	});
</script>

<div class="accountWidget">
	{#if self}
		<Avatar user={self} size="40px" />
		<a class="names" href={'/user/' + self.id}>
			<span class="top">
				{self.displayName ? self.displayName : self.username}
			</span>
			<span class="bottom">
				@{self.username}
			</span>
		</a>
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
	@media (max-width: 1355px) {
		.accountWidget {
			justify-content: center;

			.names {
				display: none !important;
			}
		}
	}

	.accountWidget {
		display: flex;
		align-items: center;

		.btns {
			display: flex;
			align-items: center;
			gap: 10px;
		}
		.names {
			display: flex;
			align-items: start;
			flex-direction: column;
			margin-left: 10px;
			width: 100%;

			color: var(--tx2);
			text-decoration: none;

			.top {
				font-weight: 600;
			}
		}
	}
</style>
