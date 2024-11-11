<button class="icon" on:click>
	<slot />
</button>

<style lang="scss">
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;

		background: none;
		border: none;
		color: inherit;
		padding: 1px;
		margin: 0;

		cursor: pointer;
	}
</style>
