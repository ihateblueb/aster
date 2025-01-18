<script lang="ts">
	import { IconDotsVertical, IconId } from '@tabler/icons-svelte';
	import Time from '$lib/components/Time.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Note from '$lib/components/Note.svelte';
	import Button from '$lib/components/Button.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import DropdownDivider from '$lib/components/DropdownDivider.svelte';

	let { report } = $props();

	let fromDropdown: undefined | Dropdown = $state();
	let userDropdown: undefined | Dropdown = $state();
</script>

{#snippet userActions(id)}
	<div class="actions">
		<Button
			transparent
			nm
			on:click={(e) => {
				if (report?.from?.id === id)
					fromDropdown ? fromDropdown.open(e) : undefined;
				if (report?.user?.id === id)
					userDropdown ? userDropdown.open(e) : undefined;
			}}
		>
			<IconDotsVertical size="var(--fs-lg)" />
		</Button>
	</div>
{/snippet}

{#snippet userActionsDropdown(id)}
	<DropdownItem>Suspend user</DropdownItem>
	<DropdownItem>Delete user</DropdownItem>
	<DropdownDivider />
	<DropdownItem>Moderate instance</DropdownItem>
{/snippet}

<Dropdown bind:this={fromDropdown}>
	{@render userActionsDropdown(report?.from?.id)}
</Dropdown>
<Dropdown bind:this={userDropdown}>
	{@render userActionsDropdown(report?.user?.id)}
</Dropdown>

<div class="report">
	<div class="top">
		<span class={'status ' + (report.resolved ? 'resolved' : 'unresolved')}>
			{report.resolved ? 'Resolved' : 'Unresolved'}
		</span>

		<span class="id">
			{report.id}
		</span>

		<span class="time">
			<Time time={report.createdAt} />
		</span>
	</div>
	{#if report.from}
		<div class="from">
			<p>From:</p>
			<Avatar user={report.from} size="35px" />
			<div class="names">
				<p>{report.from.displayName ?? report.from.username}</p>
				<p>
					@{report.from.username}{!report.from.local
						? '@' + report.from.host
						: ''}
				</p>
			</div>
			{@render userActions(report.from.id)}
		</div>
	{/if}
	{#if report.user}
		<div class="user">
			<p>User:</p>
			<Avatar user={report.user} size="35px" />
			<div class="names">
				<p>{report.user.displayName ?? report.user.username}</p>
				<p>
					@{report.user.username}{!report.user.local
						? '@' + report.user.host
						: ''}
				</p>
			</div>
			{@render userActions(report.user.id)}
		</div>
	{/if}
	{#if report.note}
		<div class="note">
			<p>Note:</p>
			<Note note={report.note} />
		</div>
	{/if}
	<div class="comment">
		{#if report.comment}
			<Mfm content={report.comment} />
		{:else}
			<p class="missing">No comment written</p>
		{/if}
	</div>
	<div class="actions">
		<Button nm>Resolve</Button>
	</div>
</div>

<style lang="scss" scoped>
	.report {
		padding: 16px;
		transition: 0.1s;

		&:hover {
			border-radius: var(--br-md);
			background-color: var(--bg3-25);
		}

		.top {
			display: flex;
			align-items: center;
			width: 100%;
			box-sizing: border-box;

			gap: 10px;
			margin-bottom: 10px;

			.status {
				display: flex;
				padding: 4px 6px;
				border-radius: var(--br-md);

				&.resolved {
					color: var(--success);
					background: var(--success-25);
				}

				&.unresolved {
					color: var(--warn);
					background: var(--warn-25);
				}
			}

			.time {
				flex-grow: 1;
				text-align: right;
			}
		}

		.from,
		.user,
		.note {
			display: flex;
			gap: 10px;
			margin-bottom: 10px;

			p {
				min-width: 40px;
			}

			.names {
				flex-grow: 1;
			}
		}

		.comment {
			margin-top: 15px;
			margin-bottom: 15px;

			.missing {
				color: var(--tx3);
				font-style: italic;
			}
		}

		.actions {
			display: flex;
			gap: 10px;
		}
	}
</style>
