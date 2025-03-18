<script lang="ts">
	import Switch from '$lib/components/Toggle.svelte';
	import localstore from '$lib/localstore';
</script>

<h2>Accessibility</h2>
<Switch
	label="Warn when posting media without alt text"
	checked={localstore.getParsed('warnNoAlt')}
	on:change={(e) => localstore.set('warnNoAlt', e.target?.checked)}
/>
<br />
<h2>Appearance</h2>
<Switch
	label="Use system font"
	checked={localstore.getParsed('useSystemFont')}
	on:change={(e) => localstore.set('useSystemFont', e.target?.checked)}
/>
<Switch
	label="Show when there are API requests are active"
	checked={localstore.getParsed('activeRequestsSpinner')}
	on:change={(e) =>
		localstore.set('activeRequestsSpinner', e.target?.checked)}
/>
<Switch
	label="Use rounded avatars"
	checked={localstore.getParsed('useRoundedAvatars')}
	on:change={(e) => localstore.set('useRoundedAvatars', e.target?.checked)}
/>
<br />
<h2>Timeline</h2>
<Switch
	label="Live update timelines and notifications"
	checked={localstore.getParsed('liveUpdateTimelines')}
	on:change={(e) => localstore.set('liveUpdateTimelines', e.target?.checked)}
/>
<Switch
	label="Automatically fetch more on scroll"
	checked={localstore.getParsed('fetchMoreOnScroll')}
	on:change={(e) => localstore.set('fetchMoreOnScroll', e.target?.checked)}
/>
<Switch
	label="Render advanced formatting"
	checked={localstore.getParsed('renderAdvancedMfm')}
	on:change={(e) => localstore.set('renderAdvancedMfm', e.target?.checked)}
/>
<Switch
	label="Enable animated MFM"
	checked={localstore.getParsed('animatedMfm')}
	on:change={(e) => localstore.set('animatedMfm', e.target?.checked)}
/>
<Switch
	label="Enable cat speak"
	checked={localstore.getParsed('catSpeak')}
	on:change={(e) => localstore.set('catSpeak', e.target?.checked)}
/>
<Switch
	label="Always collapse content warnings"
	checked={localstore.getParsed('uncollapseCws')}
	on:change={(e) => localstore.set('uncollapseCws', e.target?.checked)}
/>
<Switch
	label="Hide all media"
	checked={localstore.getParsed('hideAllMedia')}
	on:change={(e) => localstore.set('hideAllMedia', e.target?.checked)}
/>
<Switch
	label="Blur avatars of users marked sensitive"
	checked={localstore.getParsed('blurSensitiveUserAvatars')}
	on:change={(e) =>
		localstore.set('blurSensitiveUserAvatars', e.target?.checked)}
/>
<br />
<h2>Wellness</h2>
<Switch
	label="Hide interaction counters on notes"
	checked={localstore.getParsed('hideInteractionCounters')}
	on:change={(e) =>
		localstore.set('hideInteractionCounters', e.target?.checked)}
/>
<br />
<h2>Debug</h2>
<Switch
	label="Debug mode"
	checked={localstore.getParsed('debug')}
	on:change={(e) => localstore.set('debug', e.target?.checked)}
/>
