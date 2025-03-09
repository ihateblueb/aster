<script>
	import Time from '$lib/components/Time.svelte';
	import Button from '$lib/components/Button.svelte';
	import { IconDots, IconDotsVertical } from '@tabler/icons-svelte';
	import { get } from 'svelte/store';
	import store from '$lib/store';

	let { file, select = false } = $props();

	let truncatedSrc = file.src.match('.*uploads\/(.*)')[1];
	let splitSrc = truncatedSrc.split('/');

	let selected = $state(false);

	let selectedFiles = get(store.selectedFiles);
	if (selectedFiles.some((e) => e.id === file.id)) selected = true;
</script>

<button
	class={'driveFile' + (selected ? ' selected' : '')}
	onclick={() => {
		if (select) {
			if (!selected) {
				store.selectedFiles.update((e) => {
					e.push(file);
					return e;
				});

				selected = true;
			} else if (selected) {
				store.selectedFiles.update((e) =>
					e.filter((f) => f.id !== file.id)
				);

				selected = false;
			}
		}
	}}
>
	<div class="left">
		<img src={file.src} alt={file.alt} />
		<p>
			{#each splitSrc as segment}
				<span class="slash">/</span><span>{segment}</span>
			{/each}
			<span class="time">
				{new Date(file.createdAt).toLocaleString()}
			</span>
		</p>
	</div>
	{#if !select}
		<div class="right">
			<Button transparent>
				<IconDotsVertical size="18px" />
			</Button>
		</div>
	{/if}
</button>

<style lang="scss" scoped>
	.driveFile {
		display: flex;
		align-items: center;
		gap: 10px;

		background: none;
		border: none;
		border-radius: var(--br-md);
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
				width: 50px;
				height: 50px;
				object-fit: cover;
				border-radius: var(--br-md);
			}

			p {
				word-break: break-all;

				.slash {
					margin: 0 4px;
					font-weight: 200;
				}

				:first-child {
					display: none;
				}

				.time {
					display: block;
					margin-top: 4px;
					color: var(--tx3);
				}
			}
		}
	}
</style>
