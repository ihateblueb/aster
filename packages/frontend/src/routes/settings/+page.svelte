<script lang="ts">
	import Switch from '$lib/components/Toggle.svelte';
	import localstore from '$lib/localstore';

	function changeToggle(key: string, val: string) {
		localstore.set(key, val);
	}

	function value(key: string): boolean {
		let toReturn = localstore.get(key);
		return Boolean(toReturn);
	}
</script>

<h2>Accessibility</h2>
<Switch
	label="Warn when posting media without alt text"
	checked={value('warnNoAlt')}
	on:change={(e) => changeToggle('warnNoAlt', e.target?.checked)}
/>
<br />
<h2>Appearance</h2>
<Switch
	label="Use system font"
	checked={value('useSystemFont')}
	on:change={(e) => changeToggle('useSystemFont', e.target?.checked)}
/>
<Switch
	label="Show when there are API requests are active"
	checked={value('activeRequestsSpinner')}
	on:change={(e) => changeToggle('activeRequestsSpinner', e.target?.checked)}
/>
<Switch
	label="Use rounded avatars"
	checked={value('useRoundedAvatars')}
	on:change={(e) => changeToggle('useRoundedAvatars', e.target?.checked)}
/>
<br />
<h2>Timeline</h2>
<Switch
	label="Live update timelines and notifications"
	checked={value('liveUpdateTimelines')}
	on:change={(e) => changeToggle('liveUpdateTimelines', e.target?.checked)}
/>
<Switch
	label="Automatically fetch more on scroll"
	checked={value('fetchMoreOnScroll')}
	on:change={(e) => changeToggle('fetchMoreOnScroll', e.target?.checked)}
/>
<Switch
	label="Render advanced formatting"
	checked={value('renderAdvancedMfm')}
	on:change={(e) => changeToggle('renderAdvancedMfm', e.target?.checked)}
/>
<Switch
	label="Enable animated MFM"
	checked={value('animatedMfm')}
	on:change={(e) => changeToggle('animatedMfm', e.target?.checked)}
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
<br />
<h2>Wellness</h2>
<Switch
	label="Hide interaction counters on notes"
	checked={value('hideInteractionCounters')}
	on:change={(e) =>
		changeToggle('hideInteractionCounters', e.target?.checked)}
/>
<br />
<h2>Debug</h2>
<Switch
	label="Debug mode"
	checked={value('debug')}
	on:change={(e) => changeToggle('debug', e.target?.checked)}
/>
