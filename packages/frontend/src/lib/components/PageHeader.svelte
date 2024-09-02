<script lang="ts">

	import Icon from './Icon.svelte';

	export let title = 'Page';
	export let icon = '';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<template>
	<div class="pageHeader _NFt7o37">
		<div class="left">
			<div class="icon">
				<slot name="icon">
					{#if icon}
						<Icon name={icon} size="16px" color="inherit" />
					{/if}
				</slot>
			</div>
			<p>{title}</p>
			<div class="navigation">
				<slot name="navigation"></slot>
			</div>
		</div>
		<div class="right">
			<slot></slot>
		</div>
	</div>
</template>
