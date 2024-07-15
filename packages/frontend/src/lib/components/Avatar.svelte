<script lang="ts">
	export let src;
	export let alt;
	export let isCat: boolean = false;
	export let small: boolean = false;
	export let size = '55px';

	if (!src) {
		src = '/notfound.png';
	}
</script>

<template>
	<div class={'avatarCtn _zL19I0q' + (isCat ? ' cat' : '')}>
		<img
			class={'avatar _zL19I0q' + (small ? ' small' : '')}
			{src}
			height={size}
			width={size}
			{alt}
		/>
		{#if isCat}
			<div class="ears">
				<div class="earLeft"></div>
				<div class="earRight"></div>
			</div>
		{/if}
	</div>
</template>
