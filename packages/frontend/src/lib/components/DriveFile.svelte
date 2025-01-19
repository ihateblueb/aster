<script>
	import Time from '$lib/components/Time.svelte';
	import Button from '$lib/components/Button.svelte';
	import { IconDots, IconDotsVertical } from '@tabler/icons-svelte';

	let { file } = $props();

	let truncatedSrc = file.src.match('.*uploads\/(.*)')[1];
	let splitSrc = truncatedSrc.split('/');
</script>

<div class="driveFile">
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
	<div class="right">
		<Button transparent>
			<IconDotsVertical size="var(--fs-lg)" />
		</Button>
	</div>
</div>

<style lang="scss" scoped>
	.driveFile {
		display: flex;
		align-items: center;
		gap: 10px;

		padding: 16px;
		transition: 0.1s;

		&:hover {
			border-radius: var(--br-md);
			background-color: var(--bg3-25);
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
