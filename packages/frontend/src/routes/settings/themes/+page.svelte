<script lang="ts">
	import themeList from '$lib/themes/index.json';
	import localstore from '$lib/localstore.js';
	import store from '$lib/store.js';

	let lightThemes: Theme[] = $state([]);
	let darkThemes: Theme[] = $state([]);

	let themeIds = $state(Object.keys(themeList));

	let selectedLightTheme = $state(localstore.getParsed('themeLight'));
	let selectedDarkTheme = $state(localstore.getParsed('themeDark'));

	for (const themeId of themeIds) {
		let theme = themeList[themeId];
		theme['id'] = themeId;

		if (theme.colorScheme === 'light') lightThemes.push(theme);
		if (theme.colorScheme === 'dark') darkThemes.push(theme);
	}

	function updateLightTheme(theme: string) {
		localstore.set('themeLight', theme);
		selectedLightTheme = localstore.getParsed('themeLight');
		store.themeRefresh.set(true);
	}
	function updateDarkTheme(theme: string) {
		localstore.set('themeDark', theme);
		selectedDarkTheme = localstore.getParsed('themeDark');
		store.themeRefresh.set(true);
	}
</script>

<label>Light theme</label>
<select>
	{#each lightThemes as lightTheme}
		<option
			value={lightTheme.id}
			selected={lightTheme.id === selectedLightTheme}
			onclick={() => updateLightTheme(lightTheme.id)}
		>
			{lightTheme.name}
		</option>
	{/each}
</select>
<br />
<label>Dark theme</label>
<select>
	{#each darkThemes as darkTheme}
		<option
			value={darkTheme.id}
			selected={darkTheme.id === selectedDarkTheme}
			onclick={() => updateDarkTheme(darkTheme.id)}
		>
			{darkTheme.name}
		</option>
	{/each}
</select>
