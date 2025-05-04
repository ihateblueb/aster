<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import {
		IconPaperclip,
		IconPlus,
		IconUserPlus
	} from '@tabler/icons-svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import localstore from '$lib/localstore.js';
	import queryclient from '$lib/queryclient.js';
	import getFollowRequests from '$lib/api/follow-requests/get.js';
	import localizedString from '$lib/localizedString';
	import getEmojis from '$lib/api/emojis/get.js';
	import { createQuery } from '@tanstack/svelte-query';
	import getAdminMeta from '$lib/api/admin/meta.js';
	import Loading from '$lib/components/Loading.svelte';
	import Error from '$lib/components/Error.svelte';
	import EmojiCard from '$lib/components/EmojiCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import LocalizedString from '$lib/components/LocalizedString.svelte';
	import createEmoji from '$lib/api/admin/emoji/create.js';
	import store from '$lib/store.js';

	const query = createQuery({
		queryKey: ['emoji'],
		retry: false,
		queryFn: async () => (await getEmojis()) ?? {}
	});

	const emptyEmoji = {
		shortcode: undefined,
		category: undefined,
		file: undefined
	};
	let emojiFile = $state();
	let newEmoji = $state(emptyEmoji);

	async function create() {
		await createEmoji(newEmoji);
		await $query.refetch();
		modal?.close();
		newEmoji = emptyEmoji;
		emojiFile = undefined;
	}

	store.selectedFiles.subscribe(async (e) => {
		if (e) {
			emojiFile = e[0];
			newEmoji.file = emojiFile?.id;
		}
	});

	let modal: Modal | undefined = $state();
</script>

{#if $query.isLoading}
	<Loading />
{:else if $query.isError}
	<Error
		status={$query.error.status}
		message={$query.error.message}
		server={Boolean($query.error.status)}
		retry={() => $query.refetch()}
	/>
{:else if $query.isSuccess}
	<Button on:click={() => modal?.open()}>
		<IconPlus size="18px" />
		<LocalizedString id="add" />
	</Button>

	{#if $query.data}
		<Modal bind:this={modal}>
			<svelte:fragment slot="text">
				<h1>
					<LocalizedString id="create-emoji" />
				</h1>
			</svelte:fragment>

			<div class="previews">
				<div class="preview black">
					<img src={emojiFile?.src} />
				</div>
				<div class="preview">
					<img src={emojiFile?.src} />
				</div>
				<div class="preview white">
					<img src={emojiFile?.src} />
				</div>
			</div>

			<Input
				wide
				label={localizedString('shortcode')}
				bind:value={newEmoji.shortcode}
			/>
			<Input
				wide
				label={localizedString('category')}
				bind:value={newEmoji.category}
			/>
			<br />
			<Button on:click={() => store.showDrive.set(true)}>
				<IconPaperclip size="18px" />
				<LocalizedString id="add-file" />
			</Button>

			<svelte:fragment slot="buttons">
				<Button accent on:click={create}>
					<LocalizedString id="create" />
				</Button>
				<Button on:click={() => modal?.close()}>
					<LocalizedString id="cancel" />
				</Button>
			</svelte:fragment>
		</Modal>

		{#each Object.keys($query.data) as category}
			<details open>
				<summary><b>{category}</b></summary>

				{#each $query.data[category] as emoji}
					<EmojiCard {emoji} />
				{/each}
			</details>
		{/each}
	{/if}
{/if}

<style lang="scss">
	details {
		margin-bottom: 15px;
	}
	summary {
		margin-bottom: 10px;
	}

	.previews {
		display: flex;
		justify-content: center;

		margin-bottom: 10px;

		.preview {
			display: flex;
			align-items: center;
			justify-content: center;

			padding: 12px;
			border-radius: var(--br-md);

			img {
				height: 30px;
				max-width: 80px;
			}

			&.black {
				background-color: #000000;
			}
			&.white {
				background-color: #ffffff;
			}
		}
	}
</style>
