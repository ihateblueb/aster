<script>
	import LinkButton from '$lib/components/LinkButton.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<template>
	<LinkButton to="/login" type="primary wide">
		<Icon size="18px" name="login" margin="0px 6px 0px 0px" />
		Login
	</LinkButton>
</template>
