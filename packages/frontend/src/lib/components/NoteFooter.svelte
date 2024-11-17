<script>
	import {
		IconArrowBackUp,
		IconDots,
		IconPlus,
		IconRepeat,
		IconStar
	} from '@tabler/icons-svelte';
	import { bounceInOut } from 'svelte/easing';

	let animation = bounceInOut(1);

	export let note;
</script>

<footer>
	<button>
		<IconArrowBackUp size="20px" />
	</button>
	<button>
		<IconRepeat size="20px" />
	</button>
	<button>
		<IconStar size="20px" />
	</button>
	<button>
		<IconPlus size="20px" />
	</button>
	<button>
		<IconDots size="20px" />
	</button>
</footer>

<style lang="scss">
	footer {
		display: flex;
		align-items: center;
		justify-content: start;
		gap: 10px;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 4px 12px;

			background: none;
			border: none;

			color: var(--tx2);

			transition: 0.1s;

			&:hover {
				color: var(--tx1);
				scale: 1.1;
			}
		}
	}
</style>
