<script>
	import { locale } from '$lib/locale';

	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<template>
	<Button to="/login" type="primary wide">
		<Icon size="18px" name="login" margin="0px 6px 0px 0px" />
		{locale('login')}
	</Button>
</template>
