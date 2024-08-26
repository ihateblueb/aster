<script>
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import driveGet from '$lib/api/drive/get';
	import { onMount } from 'svelte';
	import driveFileAdd from '$lib/api/drive/file/add';
	import localstore from '$lib/utils/localstore';

	let fileinput;

	let driveLayout = 'grid';

	if (localstore.get('drive_layout')) {
		driveLayout = localstore.get('drive_layout');
	}

	function setLayout(layout) {
		driveLayout = layout;
		localstore.set('drive_layout', layout);
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
									{#if item.type.startsWith('image')}
										<img
											src={item.thumbnail}
											alt={item.alt}
											title={item.alt}
										/>
									{:else if item.type.startsWith('video')}
										<div class="fakeThumbnail">
											<Icon name="video" size="64px" />
										</div>
									{:else if item.type.startsWith('audio')}
										<div class="fakeThumbnail">
											<Icon name="music" size="64px" />
										</div>
									{/if}
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
											{#if item.type.startsWith('image')}
												<img
													src={item.thumbnail}
													alt={item.alt}
													title={item.alt}
												/>
											{:else if item.type.startsWith('video')}
												<div class="fakeThumbnail">
													<Icon
														name="video"
														size="18px"
													/>
												</div>
											{:else if item.type.startsWith('audio')}
												<div class="fakeThumbnail">
													<Icon
														name="music"
														size="18px"
													/>
												</div>
											{:else}
												<div class="fakeThumbnail">
													<Icon
														name="question-mark"
														size="18px"
													/>
												</div>
											{/if}
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
		display: block;
		overflow-x: scroll;
		border: 1px solid var(--bg-tertiary);
		border-radius: var(--border-s);
		box-sizing: border-box;
		height: 100%;

		table {
			border-spacing: 0px;
			padding-bottom: auto;

			th {
				text-align: left;
				padding: 5px 8px;
				background-color: var(--bg-secondary);
				border-bottom: 1px solid var(--bg-tertiary);
				font-size: var(--font-xs);
				font-weight: 500;

				&:not(:first-child) {
					min-width: 75px;
				}

				&:not(:last-child) {
					border-right: 1px solid var(--bg-tertiary);
				}
			}

			td {
				padding: 5px;
				border-bottom: 1px solid var(--bg-tertiary);

				&:not(:last-child) {
					border-right: 1px solid var(--bg-tertiary);
				}

				&:first-child {
					display: flex;
					align-items: center;
					justify-content: center;
				}

				&:not(:first-child) {
					padding: 5px;
				}

				img {
					width: 45px;
					height: 45px;
					object-fit: cover;
					border-radius: var(--border-s);
				}

				.fakeThumbnail {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 45px;
					height: 45px;
					border-radius: var(--border-s);
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

			.fakeThumbnail {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: var(--bg-tertiary);
				border-radius: var(--border-m);
				color: var(--bg-accent);
				width: 100%;
				height: 145px;
			}

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
