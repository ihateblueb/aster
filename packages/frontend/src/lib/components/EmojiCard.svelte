<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import {
		IconDots,
		IconDotsVertical,
		IconPencil,
		IconTrash
	} from '@tabler/icons-svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import LocalizedString from '$lib/components/LocalizedString.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import localizedString from '$lib/localizedString.js';
	import editEmoji from '$lib/api/admin/emoji/edit.js';
	import queryClient from '$lib/queryclient.js';
	import deleteEmoji from '$lib/api/admin/emoji/delete.js';

	let { emoji } = $props();
	let newEmoji = $state({
		shortcode: undefined,
		category: undefined
	});

	newEmoji.shortcode = emoji.shortcode;
	newEmoji.category = emoji.category;

	async function save() {
		await editEmoji(emoji?.id, newEmoji);
		await queryClient.invalidateQueries({
			queryKey: ['emoji']
		});
		modal?.close();
	}

	async function del() {
		await deleteEmoji(emoji?.id);
		await queryClient.invalidateQueries({
			queryKey: ['emoji']
		});
	}

	let dropdown: Dropdown | undefined = $state();
	let modal: Modal | undefined = $state();
</script>

<div class={'emojiCard'}>
	<div class="left">
		<img src={emoji.file.src} alt={emoji.file.alt} />
		<div class="names">
			<p class="top">{emoji.shortcode}</p>
		</div>
	</div>
	<div class="right">
		<Button more nm on:click={(e) => dropdown?.open(e)}>
			<IconDotsVertical size="18px" />
		</Button>
	</div>
</div>

<Dropdown bind:this={dropdown}>
	<DropdownItem on:click={() => modal?.open()}>
		<IconPencil size="18px" />
		<LocalizedString id="edit" />
	</DropdownItem>
	<DropdownItem danger on:click={del}>
		<IconTrash size="18px" />
		<LocalizedString id="delete" />
	</DropdownItem>
</Dropdown>

<Modal bind:this={modal}>
	<svelte:fragment slot="text">
		<h1>
			<LocalizedString
				id="editing-object"
				args={{ object: emoji.shortcode }}
			/>
		</h1>
	</svelte:fragment>

	<Input
		wide
		label={localizedString('shortcode')}
		placeholder={emoji.shortcode}
		bind:value={newEmoji.shortcode}
	/>
	<Input
		wide
		label={localizedString('category')}
		placeholder={emoji.category}
		bind:value={newEmoji.category}
	/>

	<svelte:fragment slot="buttons">
		<Button accent on:click={save}>
			<LocalizedString id="save" />
		</Button>
		<Button on:click={() => modal?.close()}>
			<LocalizedString id="cancel" />
		</Button>
	</svelte:fragment>
</Modal>

<style lang="scss" scoped>
	.emojiCard {
		display: flex;
		align-items: center;
		gap: 10px;

		background: none;
		border: none;
		border-radius: var(--br-md);
		box-sizing: border-box;
		width: 100%;

		text-align: left;
		font-family: var(--font);
		font-size: var(--fs-md);

		padding: 16px;
		transition: 0.1s;

		&:hover {
			background-color: var(--bg3-25);
		}

		&.selected {
			background-color: var(--ac1-25);

			.left {
				p {
					color: var(--ac1);
				}
				.time {
					color: var(--ac1-50);
				}
			}
		}

		.left {
			display: flex;
			align-items: center;
			gap: 10px;

			flex-grow: 1;

			img {
				width: 30px;
				height: 30px;
				object-fit: contain;
			}

			.names {
				display: flex;
				flex-direction: column;
				gap: 4px;
				.bottom {
					color: var(--tx3);
				}
			}
		}
	}
</style>
