<script>
	import * as mfm from 'mfm-js';
	import { renderMfm } from 'aster-js';

	export let content;
	export let simple = false;

	let mfmTree = [];

	if (simple) {
		mfmTree = mfm.parseSimple(content);
	} else {
		mfmTree = mfm.parse(content);
	}

	console.log(mfmTree);
</script>

<template>
	<span class="mfmCtn">
		{#each mfmTree as object}
			{@html mfmRender(object)}
		{/each}
	</span>
</template>
