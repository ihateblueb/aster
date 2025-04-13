<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import localstore from '$lib/localstore';
	import Toggle from '$lib/components/Toggle.svelte';
	import Button from '$lib/components/Button.svelte';
	import { IconDeviceFloppy } from '@tabler/icons-svelte';
	import editUser from '$lib/api/user/edit.js';
	import getUser from '$lib/api/user/get.js';

	let self: any = $state();
	let newSelf: any = $state();

	function updateSelf() {
		self = localstore.getParsed('self');
		newSelf = self;
	}

	function fetchSelf() {
		getUser(newSelf.id)
			.then((self) => {
				localstore.set('self', JSON.stringify(self));
				updateSelf();
			})
			.catch((err) => {
				console.log('failed to fetch new self');
				console.error(err);
			});
	}

	updateSelf();
	fetchSelf();

	async function update() {
		console.log(self, newSelf);

		await editUser(newSelf, newSelf.id);

		fetchSelf();
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
			label="Display name"
			placeholder={self.displayName}
			bind:value={newSelf.displayName}
			wide
		/>
		<Input
			label="Bio"
			placeholder={self.bio}
			bind:value={newSelf.bio}
			wide
			big
		/>
	</div>
	<div class="right">
		<Input
			label="Location"
			placeholder={self.location}
			bind:value={newSelf.location}
			wide
		/>
		<Input
			label="Birthday"
			placeholder={self.birthday}
			bind:value={newSelf.birthday}
			wide
		/>
	</div>
</div>

<div class="form">
	<div class="left nogap">
		<Toggle
			label="Require follows to be approved"
			bind:checked={newSelf.locked}
		/>
		<Toggle
			label="Allow notes to be indexed"
			bind:checked={newSelf.indexable}
		/>
		<Toggle
			label="Mark account as automated"
			bind:checked={newSelf.automated}
		/>
		<Toggle
			label="Mark account as sensitive"
			bind:checked={newSelf.sensitive}
		/>
		<Toggle
			label="Add cat ears to your account"
			bind:checked={newSelf.isCat}
		/>
		<Toggle label="Speak as cat" bind:checked={newSelf.speakAsCat} />
	</div>
	<div class="right"></div>
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
