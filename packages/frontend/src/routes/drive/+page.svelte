<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import driveGet from '$lib/api/drive/get';
	import { onMount } from 'svelte';
	import driveFileAdd from '$lib/api/drive/file/add';
	import Store from '$lib/utils/Store';

	let fileinput;

	let driveLayout = 'grid';

	if (Store.get('drive_layout')) {
		driveLayout = Store.get('drive_layout');
	}

	function setLayout(layout) {
		driveLayout = layout;
		Store.set('drive_layout', layout);
	}

	let drive = [];

	async function inputChanged(e) {
		console.log(e.target.files);

		Array.from(e.target.files).forEach(async (file) => {
			await driveFileAdd(file);
		});
	}

	async function refresh() {
		drive = [];
		drive = await driveGet();
	}

	onMount(async () => {
		drive = await driveGet();
	});
</script>

<template>
	<PageHeader title={locale('drive')} icon="folder">
		<Button
			type={'header' + (driveLayout === 'list' ? ' selected' : '')}
			on:click={() => {
				setLayout('list');
			}}
		>
			<Icon name="layout-list" size="16px" />
		</Button>
		<Button
			type={'header' + (driveLayout === 'grid' ? ' selected' : '')}
			on:click={() => {
				setLayout('grid');
			}}
		>
			<Icon name="layout-grid" size="16px" />
		</Button>
		<hr class="vertical" />
		<Button
			type="header"
			on:click={() => {
				refresh();
			}}
		>
			<Icon name="refresh" size="16px" />
		</Button>
		<hr class="vertical" />
		<input
			style="display: none;"
			type="file"
			multiple
			on:change={(e) => inputChanged(e)}
			bind:this={fileinput}
		/>
		<Button
			type="header"
			on:click={() => {
				fileinput.click();
			}}
		>
			<Icon name="plus" size="16px" />
		</Button>
	</PageHeader>

	<div class="pageContent">
		<div class="paddedPage">
			{#key drive}
				{#if drive.length > 0}
					{#if driveLayout === 'grid'}
						<div class="driveItemsGrid">
							{#each drive as item}
								<a
									href={'/drive/file/' + item.id}
									class="item subtle"
								>
									<img
										src={item.src}
										alt={item.alt}
										title={item.alt}
									/>
									<div class="label">
										<p>{item.name}</p>
										<small>{item.type}</small>
									</div>
								</a>
							{/each}
						</div>
					{:else if driveLayout === 'list'}
						<div class="driveItemsList">
							<table>
								<tr>
									<th>{locale('preview')}</th>
									<th>{locale('name')}</th>
									<th>{locale('type')}</th>
									<th>{locale('created_at')}</th>
									<th>{locale('updated_at')}</th>
									<th>{locale('has_alt')}</th>
								</tr>
								{#each drive as item}
									<tr>
										<td>
											<img
												src={item.src}
												alt={item.alt}
												title={item.alt}
											/>
										</td>
										<td
											><a
												href={'/drive/file/' + item.id}
												class="subtle">{item.name}</a
											></td
										>
										<td>{item.type}</td>
										<td>{item.created_at}</td>
										<td>{item.updated_at}</td>
										<td>{item.alt ? 'true' : 'false'}</td>
									</tr>
								{/each}
							</table>
						</div>
					{/if}
				{:else}
					<p>{locale('empty_drive')}</p>
				{/if}
			{/key}
		</div>
	</div>
</template>

<style lang="scss">
	.driveItemsList {
		overflow-x: scroll;

		table {
			border: 1px solid var(--bg-secondary);
			border-radius: var(--border-s);

			th {
				text-align: left;
				padding: 2px 5px;
				border-bottom: 1px solid var(--bg-secondary);

				&:not(:first-child) {
					min-width: 100px;
				}

				&:not(:last-child) {
					border-right: 1px solid var(--bg-secondary);
				}
			}

			td {
				padding: 2px 5px;
				border-bottom: 1px solid var(--bg-secondary);

				&:not(:last-child) {
					border-right: 1px solid var(--bg-secondary);
				}

				img {
					width: 35px;
					height: 35px;
					object-fit: cover;
				}
			}
		}
	}
	.driveItemsGrid {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;

		.item {
			display: flex;
			flex-grow: 1;
			flex-shrink: 1;
			background-color: var(--bg-secondary);
			flex-direction: column;
			width: 200px;
			min-width: 145px;
			border-radius: var(--border-m);
			padding: 10px;
			overflow: hidden;
			word-break: break-all;

			img {
				border-radius: var(--border-m);
				object-fit: cover;
				height: 145px;
				width: 100%;
			}

			.label {
				margin-top: 10px;
				font-size: var(--font-s);

				small {
					font-size: var(--font-xs);
					color: var(--txt-tertiary);
				}
			}
		}
	}
</style>
