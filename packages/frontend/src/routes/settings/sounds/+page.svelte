<script lang="ts">
	import Switch from '$lib/components/Toggle.svelte';
	import localstore from '$lib/localstore.js';
	import Slider from '$lib/components/Slider.svelte';

	function change(key: string, val: string) {
		console.log('set:', key, val);
		localstore.set(key, val);
	}

	function value(key: string): boolean {
		let toReturn = localstore.get(key);
		console.log('get:', key, Boolean(toReturn));
		return Boolean(toReturn);
	}

	function numberValue(key: string): number {
		let toReturn = localstore.get(key);
		console.log('get:', key, Number(toReturn));
		return Number(toReturn);
	}
</script>

<Switch
	label="Enable sounds"
	checked={value('enableSounds')}
	on:change={(e) => change('enableSounds', e.target?.checked)}
/>

<Slider
	label="Sound volume"
	min={0}
	max={1}
	step={0.05}
	value={numberValue('soundVolume')}
	on:change={(e) => change('soundVolume', e.target?.value)}
/>
