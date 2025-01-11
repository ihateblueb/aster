<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import localstore from '$lib/localstore';
	import Toggle from '$lib/components/Toggle.svelte';
	import Button from '$lib/components/Button.svelte';
	import { IconDeviceFloppy } from '@tabler/icons-svelte';

	let self = localstore.get('self');
	let newSelf: any = {};

	if (self) {
		try {
			self = JSON.parse(self);
			newSelf = JSON.parse(self);
		} catch (err) {
			console.error(err);
		}
	}
</script>

{#key self}
	<div class="header">
		<div class="left"></div>
		<div class="right">
			<Button accent>
				<IconDeviceFloppy size="var(--fs-lg)" />
				Save
			</Button>
		</div>
	</div>
	<br />

	<div class="form">
		<div class="left">
			<Input
				label="Display name"
				placeholder={self.displayName ?? self.username}
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
		<div class="left">
			<Toggle
				label="Require follows to be approved"
				checked={newSelf.locked}
			/>
			<Toggle
				label="Allow notes to be indexed"
				checked={newSelf.indexable}
			/>
			<Toggle
				label="Mark account as automated"
				checked={newSelf.automated}
			/>
			<Toggle
				label="Mark account as sensitive"
				checked={newSelf.sensitive}
			/>
			<Toggle
				label="Add cat ears to your account"
				checked={newSelf.isCat}
			/>
			<Toggle label="Speak as cat" checked={newSelf.speakAsCat} />
		</div>
		<div class="right"></div>
	</div>
{/key}

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
			gap: 4px;
		}
	}
</style>
