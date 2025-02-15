<script lang="ts">
	let { nm = false, tl = false, centered = false } = $props();
</script>

<div
	class={'pageWrapper' +
		(nm ? ' nm' : '') +
		(tl ? ' tl' : '') +
		(centered ? ' centered' : '')}
>
	<slot></slot>
</div>

<style lang="scss" scoped>
	.pageWrapper {
		display: block;
		position: relative;
		box-sizing: border-box;

		--viewHeight: 100vh;
		--pageHeader: 50px;
		--safeArea: env(safe-area-inset-bottom);
		--padding: 12px;

		/*
			iphone with notch:
			this creates too big of a bottom gap, but it sits a bit above the home bar.

			firefox, desktop:
			looks just fine
		*/
		--removed: (var(--pageHeader) + var(--safeArea));

		padding: var(--padding);
		height: calc(var(--viewHeight) - var(--removed));
		overflow-y: auto;

		background: var(--bg2);
		border-radius: var(--br-lg) var(--br-lg) 0 0;

		&.nm {
			--padding: 0px;
		}

		&.tl {
			--padding: 8px;
		}

		&.centered {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 10px;
		}
	}
</style>
