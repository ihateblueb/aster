<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import lookupUser from '$lib/api/user/lookup.js';
	import getUser from '$lib/api/user/get.js';
	import Loading from '$lib/components/Loading.svelte';
	import Error from '$lib/components/Error.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Input from '$lib/components/Input.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import Button from '$lib/components/Button.svelte';
	import {
		IconAlertTriangle,
		IconAlertTriangleOff,
		IconBadges,
		IconBadgesOff,
		IconDeviceFloppy,
		IconGavel,
		IconUserCheck,
		IconUserX
	} from '@tabler/icons-svelte';

	let props = $props();

	const query = createQuery({
		queryKey: ['admin_user_' + props.data.userid],
		retry: false,
		queryFn: async () => await getUser(props.data.userid)
	});
</script>

{#if $query.isLoading}
	<Loading />
{:else if $query.isError}
	<Error
		status={$query.error.status}
		message={$query.error.message}
		server={Boolean($query.error.status)}
		retry={() => $query.refetch()}
	/>
{:else if $query.isSuccess}
	<div class="header">
		<div class="left">
			<Avatar user={$query.data} />

			<div class="details">
				<Mfm
					content={$query.data?.displayName ?? $query.data.username}
					emojis={$query.data.emojis}
					simple
				/>
				<p class="handle">
					@{$query.data.username}<span class="host"
						>@{$query.data.host}</span
					>
				</p>

				<div class="statuses">
					{#if $query.data.activated}
						<span class="status true">Activated</span>
					{:else}
						<span class="status">Not Activated</span>
					{/if}
					{#if $query.data.suspended}
						<span class="status true">Suspended</span>
					{:else}
						<span class="status">Not Suspended</span>
					{/if}
					{#if $query.data.sensitive}
						<span class="status true">Sensitive</span>
					{:else}
						<span class="status">Not Sensitive</span>
					{/if}
					{#if $query.data.admin}
						<span class="status true">Admin</span>
					{:else}
						<span class="status">Not Admin</span>
					{/if}
				</div>
			</div>
		</div>
		<div class="right">
			<Button nm>
				<IconDeviceFloppy size="18px" />
				Save
			</Button>
		</div>
	</div>

	<div class="note">
		<Input label="Moderation note" wide big></Input>
	</div>
	<div class="btns">
		<div class="left">
			{#if $query.data.activated}
				<Button danger nm>
					<IconUserX size="18px" />
					Deactivate
				</Button>
			{:else}
				<Button nm>
					<IconUserCheck size="18px" />
					Activate
				</Button>
			{/if}
			{#if $query.data.suspended}
				<Button danger nm>
					<IconGavel size="18px" />
					Unsuspend
				</Button>
			{:else}
				<Button nm>
					<IconGavel size="18px" />
					Suspend
				</Button>
			{/if}
			{#if $query.data.sensitive}
				<Button danger nm>
					<IconAlertTriangle size="18px" />
					Unmark Sensitive
				</Button>
			{:else}
				<Button nm>
					<IconAlertTriangle size="18px" />
					Mark Sensitive
				</Button>
			{/if}
		</div>
		<div class="right">
			{#if $query.data.admin}
				<Button danger nm>
					<IconBadgesOff size="18px" />
					Unmark Admin
				</Button>
			{:else}
				<Button nm>
					<IconBadges size="18px" />
					Mark Admin
				</Button>
			{/if}
		</div>
	</div>
{/if}

<div class="forms">
	<div class="form">
		<div class="left">
			<Input label="Display name" wide />
			<Input label="Bio" wide big />
		</div>
		<div class="right">
			<Input label="Forced content warning" wide></Input>
			<Input label="Location" wide />
			<Input label="Birthday" wide />
		</div>
	</div>

	<div class="form">
		<div class="left nogap">
			<Toggle label="Require follows to be approved" />
			<Toggle label="Allow notes to be indexed" />
			<Toggle label="Mark account as automated" />
			<Toggle label="Mark account as sensitive" />
			<Toggle label="Add cat ears to your account" />
			<Toggle label="Speak as cat" />
		</div>
		<div class="right"></div>
	</div>
</div>

<style lang="scss">
	.header {
		display: flex;
		gap: 10px;

		.left {
			display: flex;
			align-items: flex-start;
			flex: 1;
			gap: 10px;

			.details {
				display: flex;
				flex-direction: column;
				justify-content: center;

				color: var(--tx1);
				font-size: var(--fs-md);

				.handle {
					color: var(--tx2);

					.host {
						color: var(--tx3);
					}
				}

				.statuses {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 4px;

					margin-top: 4px;

					.status {
						padding: 3px 6px;
						font-size: var(--fs-sm);
						border-radius: var(--br-md);
						background-color: var(--ac1-25);
						color: var(--ac1);

						&.true {
							color: var(--tx1);
							background-color: var(--ac1);
						}
					}
				}
			}
		}
		.right {
			display: flex;
			align-items: flex-start;
			justify-content: flex-end;
			flex-wrap: wrap;
			gap: 4px;
		}
	}

	.note,
	.btns,
	.forcedCw {
		margin-top: 15px;
	}

	.btns,
	.left {
		display: flex;
		gap: 10px;
	}

	.btns {
		.left {
			flex: 1;
			flex-wrap: wrap;
		}
	}

	@media (max-width: 700px) {
		.form {
			flex-direction: column;
		}
	}

	.forms {
		margin-top: 25px;

		.form {
			display: flex;
			width: 100%;
			gap: 15px;

			padding-top: 15px;

			.left,
			.right {
				flex-grow: 1;
				display: flex;
				flex-direction: column;

				&:not(.nogap) {
					gap: 4px;
				}
			}
		}
	}
</style>
