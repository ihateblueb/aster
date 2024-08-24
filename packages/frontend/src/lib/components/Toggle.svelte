<script>
	import { v4 as uuidv4 } from 'uuid';

	export let label;

	let id = uuidv4();
</script>

<template>
	<input {id} type="checkbox" class="_0CKr7x3" on:change />
	<label for={id} class="switch">
		{label}
	</label>
</template>
