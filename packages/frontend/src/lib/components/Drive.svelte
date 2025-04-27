<script>
	import { IconCloud, IconPlus, IconTrash } from '@tabler/icons-svelte';
	import Button from '$lib/components/Button.svelte';
	import upload from '$lib/api/upload';
	import Timeline from '$lib/components/Timeline.svelte';
	import getDrive from '$lib/api/drive/get';
	import LocalizedString from '$lib/components/LocalizedString.svelte';
	import addAlert from '$lib/addAlert.js';
	import localizedString from '$lib/localizedString.js';

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

<div class="drive">
	<div class="header">
		<div class="left">
			<IconCloud size="18px" />
			<LocalizedString id="drive" />
		</div>
		<div class="right">
			<input
				style="display: none;"
				type="file"
				name="files"
				multiple
				on:change={async (e) => await onInputChange(e)}
				bind:this={fileInput}
			/>
			<Button transparent nm on:click={() => fileInput.click()}>
				<IconPlus size="18px" />
			</Button>
		</div>
	</div>
	<div class="body">
		<Timeline
			type="drive"
			queryKey="drive"
			queryFn={getDrive}
			select
			bind:query
		/>
	</div>
</div>

<style lang="scss" scoped>
	.drive {
		display: flex;
		flex-direction: column;

		.header {
			display: flex;
			align-items: center;
			padding: 0 12px;
			margin-bottom: 10px;

			.left {
				display: flex;
				align-items: center;
				gap: 10px;

				flex-grow: 1;
			}
		}

		.body {
			height: 500px;
			overflow-y: auto;

			padding: 0 6px;
		}
	}
</style>
