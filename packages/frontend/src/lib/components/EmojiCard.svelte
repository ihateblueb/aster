<script>
	let { emoji } = $props();
</script>

<button class={'emojiCard'}>
	<div class="left">
		<img src={emoji.file.src} alt={emoji.file.alt} />
		<div class="names">
			<p class="top">{emoji.shortcode}</p>
			<p class="bottom">{emoji.category}</p>
		</div>
	</div>
</button>

<style lang="scss" scoped>
	.emojiCard {
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
				max-width: 100px;
				height: 35px;
				object-fit: cover;
				border-radius: var(--br-md);
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
