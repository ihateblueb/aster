<script>
	import { IconEyeOff } from '@tabler/icons-svelte';
	import Button from '$lib/components/Button.svelte';
	import localstore from '$lib/localstore';

	let { attachment, small = false } = $props();

	let show = $state(true);
	if (attachment.sensitive) show = false;
	if (localstore.get('hideAllMedia') === 'true') show = false;
</script>

{#if attachment}
	<div class={'attachment' + (small ? ' small' : '')}>
		{#if show}
			<div class="float">
				<div class="left">
					<button on:click={() => (show = !show)}>
						<IconEyeOff size="var(--fs-lg)" />
					</button>
				</div>
				<div class="right">
					<slot></slot>
				</div>
			</div>
			{#if attachment.type && attachment.type.startsWith('video')}
				<video src={attachment.src} title={attachment.alt} controls>
					<meta itemprop="description" content={attachment.alt} />
				</video>
			{:else if attachment.type && attachment.type.startsWith('audio')}
				<audio src={attachment.src} title={attachment.alt} controls>
					<meta itemprop="description" content={attachment.alt} />
				</audio>
			{:else}
				<img
					src={attachment.src}
					alt={attachment.alt}
					title={attachment.alt}
				/>
			{/if}
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
		img,
		video,
		audio {
			width: 100%;
			height: 100%;
			max-height: 350px;
			min-height: 100px;
			object-fit: contain;
		}

		&.small {
			background-color: var(--bg3-25);

			a,
			img {
				max-height: 100px;
			}

			.hidden {
				height: 100px;
			}
		}

		.hidden {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 2px;
			height: 350px;
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
					cursor: pointer;

					&:hover {
						color: var(--tx3);
					}
				}
			}
			.right {
				position: absolute;
				top: 4px;
				right: 4px;
			}
		}
	}
</style>
