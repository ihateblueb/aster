<script>
	import { locale } from '$lib/locale';

	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	import noteCreate from '$lib/api/note/create';

	let noteCw = '';
	let noteContent = '';
</script>

<template>
	<Input type="wide" placeholder={locale('cw')} bind:value={noteCw}></Input>
	<Input
		type="wide"
		big
		placeholder={locale('whats_on_your_mind')}
		bind:value={noteContent}
	></Input>
	<Button on:click={() => noteCreate(noteCw, noteContent)}>
		{locale('note')}
	</Button>
</template>
