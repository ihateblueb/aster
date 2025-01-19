<script>
	import Time from '$lib/components/Time.svelte';

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
		</p>
	</div>
	<div class="right">
		<Time time={file.createdAt} />
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

				border-radius: var(--br-md);
			}

			p {
				.slash {
					color: var(--tx3);
					margin: 0 4px;
				}

				:first-child {
					display: none;
				}
			}
		}
	}
</style>
