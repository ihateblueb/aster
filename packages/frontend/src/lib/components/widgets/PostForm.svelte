<script>
	import { locale } from '$lib/locale';

	import noteCreate from '$lib/api/note/create';

	let noteCw = '';
	let noteContent = '';
</script>

<template>
	<input class="ipt" placeholder={locale('cw')} bind:value={noteCw} />
	<textarea
		class="ipt"
		placeholder={locale('whats_on_your_mind')}
		style="resize-x: none;"
		bind:value={noteContent}
	/>
	<button class="btn" on:click={() => noteCreate(noteCw, noteContent)}
		>{locale('note')}</button
	>
</template>
