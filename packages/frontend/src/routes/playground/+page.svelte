<script>
	import { page } from '$app/stores';
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Input from '$lib/components/Input.svelte';
	import Note from '$lib/components/Note.svelte';

	let mfmContent = '';
</script>

<template>
	<PageHeader title={locale('mfm_playground')} icon="box" />
	<div class="pageContent paddedPage">
		<strong>{locale('input')}:</strong><br />
		<Input type="wide" big bind:value={mfmContent} />
		<br /><br />
		<strong>{locale('output')}:</strong><br />

		{#key mfmContent}
			<Note
				data={{
					id: '0',
					author: {
						id: '0',
						displayname: 'Dr. Wallace Breen',
						username: 'breen',
						host: 'cityseventeen.local'
					},
					content: mfmContent
				}}
			/>
		{/key}
	</div>
</template>
