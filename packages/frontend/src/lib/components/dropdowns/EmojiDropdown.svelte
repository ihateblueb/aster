<script>
	import localstore from '$lib/localstore';
	import Input from '$lib/components/Input.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let emojis = localstore.get('emojis');
	let parsedEmojis = $state();
	let query = $state();

	try {
		parsedEmojis = JSON.parse(emojis);
	} catch (err) {
		console.log(err);
		console.log('failed to parse emojis');
	}
</script>

<div class="emojiDropdown">
	<div class="search">
		<Input placeholder="Search..." bind:value={query} nm wide />
	</div>
	{#if parsedEmojis}
		{#each Object.keys(parsedEmojis) as category}
			<div class="header">
				<p>{category}</p>
			</div>
			<div class="body">
				{#each parsedEmojis[category] as emoji}
					{#if !query || (query && emoji.shortcode.startsWith(query))}
						<button
							onclick={() =>
								dispatch('emojiSelected', emoji.shortcode)}
						>
							<img
								class="emoji"
								src={emoji.file.src}
								alt={emoji.file.alt}
								title={emoji.shortcode}
							/>
						</button>
					{/if}
				{/each}
			</div>
		{/each}
	{/if}
</div>

<style lang="scss" scoped>
	.emojiDropdown {
		.search {
			padding: 4px;
		}
		.header {
			display: flex;
			align-items: center;

			padding: 6px 8px;
			background-color: var(--bg4-25);

			p {
				flex-grow: 1;
			}
		}
		.body {
			display: flex;
			flex-wrap: wrap;
			padding: 4px;

			button {
				display: flex;
				align-items: center;
				justify-content: center;

				border: none;
				background: none;

				border-radius: var(--br-md);
				padding: 4px;

				transition: 0.1s;

				&:hover {
					background-color: var(--bg4-50);
				}

				.emoji {
					height: 30px;
					width: 30px;
					object-fit: contain;
				}
			}
		}
	}
</style>
