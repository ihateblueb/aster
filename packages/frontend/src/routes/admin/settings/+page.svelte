<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import localstore from '$lib/localstore';
	import Toggle from '$lib/components/Toggle.svelte';
	import Button from '$lib/components/Button.svelte';
	import { IconDeviceFloppy } from '@tabler/icons-svelte';
	import editUser from '$lib/api/user/edit.js';
	import getUser from '$lib/api/user/get.js';
	import localizedString from '$lib/localizedString.js';
	import getMeta from '$lib/api/meta/get.js';
	import editMeta from '$lib/api/meta/edit.js';

	let meta: any = $state();
	let newMeta: any = $state({
		name: undefined,
		description: undefined,
		maintainer: undefined,
		maintainerEmail: undefined
	});

	async function updateMeta() {
		meta = await getMeta();
		newMeta = meta;
	}

	updateMeta();

	async function update() {
		console.log(meta, newMeta);
		await editMeta(newMeta);
		await updateMeta();
	}
</script>

<div class="header">
	<div class="left"></div>
	<div class="right">
		<Button on:click={() => update()}>
			<IconDeviceFloppy size="18px" />
			Save
		</Button>
	</div>
</div>
<br />

<div class="form">
	<div class="left">
		<Input
			label={localizedString('instance-name')}
			placeholder={meta?.name}
			bind:value={newMeta.name}
			wide
		/>
		<Input
			label={localizedString('description')}
			placeholder={meta?.description}
			bind:value={newMeta.description}
			wide
			big
		/>
	</div>
	<div class="right">
		<Input
			label={localizedString('maintainer')}
			placeholder={meta?.maintainer}
			bind:value={newMeta.maintainer}
			wide
		/>
		<Input
			label={localizedString('maintainer-email')}
			placeholder={meta?.maintainerEmail}
			bind:value={newMeta.maintainerEmail}
			wide
		/>
	</div>
</div>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;

		.left {
			flex-grow: 1;
		}
	}

	@media (max-width: 700px) {
		.form {
			flex-direction: column;
		}
	}

	.form {
		display: flex;
		width: 100%;
		gap: 14px;
		padding-bottom: 14px;

		.left,
		.right {
			flex-grow: 1;
			display: flex;
			flex-direction: column;

			&:not(.nogap) {
				gap: 4px;
			}
		}
	}
</style>
