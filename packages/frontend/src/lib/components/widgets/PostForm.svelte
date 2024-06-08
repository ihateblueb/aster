<script>
	import noteCreate from '$lib/api/note/create';

	let noteCw = '';
	let noteContent = '';
</script>

<template>
	<input class="ipt" placeholder="Content warning" bind:value={noteCw} />
	<textarea
		class="ipt"
		placeholder="What's on your mind?"
		style="resize-x: none;"
		bind:value={noteContent}
	/>
	<button class="btn" on:click={() => noteCreate(noteCw, noteContent)}
		>Note</button
	>
</template>
