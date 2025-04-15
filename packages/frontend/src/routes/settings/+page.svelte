<script lang="ts">
	import Switch from '$lib/components/Toggle.svelte';
	import localstore from '$lib/localstore';
	import localizedString from '$lib/localizedString';
	import LocalizedString from '$lib/components/LocalizedString.svelte';
</script>

<h2>
	<LocalizedString id="accessibility" />
</h2>
<Switch
	label={localizedString('warn-when-posting-without-alt')}
	checked={localstore.getParsed('warnNoAlt')}
	on:change={(e) => localstore.set('warnNoAlt', e.target?.checked)}
/>
<br />
<h2>
	<LocalizedString id="appearance" />
</h2>
<Switch
	label={localizedString('use-system-font')}
	checked={localstore.getParsed('useSystemFont')}
	on:change={(e) => localstore.set('useSystemFont', e.target?.checked)}
/>
<Switch
	label={localizedString('show-when-requests-active')}
	checked={localstore.getParsed('activeRequestsSpinner')}
	on:change={(e) =>
		localstore.set('activeRequestsSpinner', e.target?.checked)}
/>
<Switch
	label={localizedString('use-rounded-avatars')}
	checked={localstore.getParsed('useRoundedAvatars')}
	on:change={(e) => localstore.set('useRoundedAvatars', e.target?.checked)}
/>
<br />
<h2>
	<LocalizedString id="timeline" />
</h2>
<Switch
	label={localizedString('live-update-timeline')}
	checked={localstore.getParsed('liveUpdateTimelines')}
	on:change={(e) => localstore.set('liveUpdateTimelines', e.target?.checked)}
/>
<Switch
	label={localizedString('automatically-fetch-more')}
	checked={localstore.getParsed('fetchMoreOnScroll')}
	on:change={(e) => localstore.set('fetchMoreOnScroll', e.target?.checked)}
/>
<Switch
	label={localizedString('render-advanced-formatting')}
	checked={localstore.getParsed('renderAdvancedMfm')}
	on:change={(e) => localstore.set('renderAdvancedMfm', e.target?.checked)}
/>
<Switch
	label={localizedString('enable-animated-mfm')}
	checked={localstore.getParsed('animatedMfm')}
	on:change={(e) => localstore.set('animatedMfm', e.target?.checked)}
/>
<Switch
	label={localizedString('enable-cat-speak')}
	checked={localstore.getParsed('catSpeak')}
	on:change={(e) => localstore.set('catSpeak', e.target?.checked)}
/>
<Switch
	label={localizedString('always-collapse-cw')}
	checked={localstore.getParsed('uncollapseCws')}
	on:change={(e) => localstore.set('uncollapseCws', e.target?.checked)}
/>
<Switch
	label={localizedString('hide-all-media')}
	checked={localstore.getParsed('hideAllMedia')}
	on:change={(e) => localstore.set('hideAllMedia', e.target?.checked)}
/>
<Switch
	label={localizedString('blur-avatars-of-sensitive-users')}
	checked={localstore.getParsed('blurSensitiveUserAvatars')}
	on:change={(e) =>
		localstore.set('blurSensitiveUserAvatars', e.target?.checked)}
/>
<br />
<h2>
	<LocalizedString id="wellness" />
</h2>
<Switch
	label={localizedString('hide-interaction-counters')}
	checked={localstore.getParsed('hideInteractionCounters')}
	on:change={(e) =>
		localstore.set('hideInteractionCounters', e.target?.checked)}
/>
<br />
<h2>
	<LocalizedString id="debug" />
</h2>
<Switch
	label={localizedString('debug-mode')}
	checked={localstore.getParsed('debug')}
	on:change={(e) => localstore.set('debug', e.target?.checked)}
/>
