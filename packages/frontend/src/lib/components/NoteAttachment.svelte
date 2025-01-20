<script>
	import { IconEyeOff } from '@tabler/icons-svelte';
	import Button from '$lib/components/Button.svelte';
	import localstore from '$lib/localstore';

	let { attachment } = $props();

	let show = $state(true);
	if (attachment.sensitive) show = false;
	if (localstore.get('hideAllMedia') === 'true') show = false;
</script>

{#if attachment}
	<div class="attachment">
		{#if show}
			<div class="float">
				<div class="left">
					<button on:click={() => (show = !show)}>
						<IconEyeOff size="var(--fs-lg)" />
					</button>
				</div>
			</div>
			<img
				src={attachment.src}
				alt={attachment.alt}
				title={attachment.alt}
			/>
		{:else}
			<div class="hidden">
				<Button thin on:click={() => (show = !show)}>Show media</Button>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss" scoped>
	.attachment {
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		background-color: var(--bg1-50);

		a,
		img {
			width: 100%;
			height: 100%;
			max-height: 350px;
			min-height: 100px;
			object-fit: contain;
		}

		.hidden {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 2px;
			height: 325px;
		}

		.float {
			.left {
				position: absolute;
				top: 4px;
				left: 4px;

				button {
					display: flex;
					align-items: center;
					justify-content: center;

					border: none;
					background-color: var(--bg4-50);
					backdrop-filter: blur(var(--blur-sm));
					border-radius: var(--br-sm);
					color: var(--tx2);
					padding: 4px;

					transition: 0.1s;

					&:hover {
						color: var(--tx3);
					}
				}
			}
		}
	}
</style>
