<script lang="ts">
	import Switch from '$lib/components/Toggle.svelte';
	import localstore from '$lib/localstore.js';
	import Slider from '$lib/components/Slider.svelte';
</script>

<Switch
	label="Enable sounds"
	checked={localstore.getParsed('enableSounds')}
	on:change={(e) => localstore.set('enableSounds', e.target?.checked)}
/>

<Slider
	label="Sound volume"
	min={0}
	max={1}
	step={0.05}
	value={localstore.getParsed('soundVolume')}
	on:change={(e) => localstore.set('soundVolume', e.target?.value)}
/>
