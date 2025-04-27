<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import { IconCloud, IconPlus } from '@tabler/icons-svelte';
	import Button from '$lib/components/Button.svelte';
	import upload from '$lib/api/upload';
	import Timeline from '$lib/components/Timeline.svelte';
	import getDrive from '$lib/api/drive/get';
	import localizedString from '$lib/localizedString';
	import addAlert from '$lib/addAlert.js';

	let query = $state();

	let fileInput = $state();

	async function onInputChange(e) {
		console.log(e.target.files);

		let formData = new FormData();

		for (const file of Array.from(e.target.files)) {
			console.log('[drive] upload ' + file.name);
			formData.append('files', file);
		}

		console.log(formData);

		await upload(formData)
			.then(() => {
				addAlert({
					type: 'system',
					text: localizedString('uploaded-files', {
						count: e.target.files.length
					})
				});
				if (query) $query.refetch();
			})
			.catch((err) => {
				addAlert({
					type: 'system',
					text: localizedString('upload-failed', {
						error: err.message
					})
				});
			});
	}
</script>

<PageHeader title={localizedString('drive')}>
	<svelte:fragment slot="icon">
		<IconCloud size="18px" />
	</svelte:fragment>

	<input
		style="display: none;"
		type="file"
		name="files"
		multiple
		on:change={async (e) => await onInputChange(e)}
		bind:this={fileInput}
	/>
	<Button header on:click={() => fileInput.click()}>
		<IconPlus size="18px" />
	</Button>
</PageHeader>

<PageWrapper tl>
	<Timeline type="drive" queryKey="drive" queryFn={getDrive} bind:query />
</PageWrapper>
