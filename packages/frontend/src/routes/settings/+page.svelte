<script lang="ts">
	import Switch from '$lib/components/Toggle.svelte';
	import localstore from '$lib/localstore';

	function changeToggle(key: string, val: string) {
		console.log('set:', key, val);
		localstore.set(key, val);
	}

	function value(key: string): boolean {
		let toReturn = localstore.get(key);
		console.log('get:', key, Boolean(toReturn));
		return Boolean(toReturn);
	}
</script>

<h2>Accessibility</h2>
<Switch
	label="Warn when posting media without alt text"
	checked={value('warnNoAlt')}
	on:change={(e) => changeToggle('warnNoAlt', e.target?.checked)}
/>
<h2>Note Appearance</h2>
<Switch
	label="Render more than basic formatting"
	checked={value('renderAdvancedMfm')}
	on:change={(e) => changeToggle('renderAdvancedMfm', e.target?.checked)}
/>
<Switch
	label="Enable cat speak"
	checked={value('catSpeak')}
	on:change={(e) => changeToggle('catSpeak', e.target?.checked)}
/>
<Switch
	label="Always collapse content warnings"
	checked={value('uncollapseCws')}
	on:change={(e) => changeToggle('uncollapseCws', e.target?.checked)}
/>
<Switch
	label="Hide all media"
	checked={value('hideAllMedia')}
	on:change={(e) => changeToggle('hideAllMedia', e.target?.checked)}
/>
