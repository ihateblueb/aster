<script>
	import Input from '$lib/components/Input.svelte';
	import { IconCheck, IconPencil, IconX } from '@tabler/icons-svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import Button from '$lib/components/Button.svelte';
	import updateAdminFederationRules from '$lib/api/admin/federation/rules/update';

	let { instanceRule } = $props();

	let editing = $state(false);
	let deleted = $state(false);

	function toggleEdit() {
		if (editing) {
			editing = false;
		} else {
			editing = true;
		}
	}

	function deleteRule() {
		deleted = true;
	}
</script>

{#if !deleted}
	<div class="instanceRule">
		<div class="top">
			<div class="start">
				{#if editing}
					<Input placeholder="Host" value={instanceRule.host} wide />
					<Input
						placeholder="Content warning"
						value={instanceRule.cw}
						wide
					/>
				{:else}
					<b>{instanceRule.host}</b>
					<i>{instanceRule.cw}</i>
				{/if}
			</div>
			<div class="end">
				<Button nm on:click={() => toggleEdit()}>
					{#if editing}
						<IconCheck size="18px" />
						<span class="label">Save</span>
					{:else}
						<IconPencil size="18px" />
						<span class="label">Edit</span>
					{/if}
				</Button>
				<Button nm on:click={() => deleteRule()}>
					<IconX size="18px" />
					<span class="label">Delete</span>
				</Button>
			</div>
		</div>

		<div class="btm">
			<div
				class={'state ' + instanceRule.sensitive}
				title="Whether or not users from this instance will be marked as sensitive"
			>
				<p>Sensitive</p>
				{#if instanceRule.sensitive}
					<IconCheck size="14px" />
				{:else}
					<IconX size="14px" />
				{/if}
			</div>
			<div
				class={'state ' + instanceRule.deliver}
				title="Whether or not activities wil be delivered to this instance"
			>
				<p>Delivering</p>
				{#if instanceRule.deliver}
					<IconCheck size="14px" />
				{:else}
					<IconX size="14px" />
				{/if}
			</div>
			<div
				class={'state ' + instanceRule.accept}
				title="Whether or not activities will be accepted from this instance"
			>
				<p>Accepting</p>
				{#if instanceRule.accept}
					<IconCheck size="14px" />
				{:else}
					<IconX size="14px" />
				{/if}
			</div>
			<div
				class={'state ' + instanceRule.fetch}
				title="Whether or not to try fetching content from this instance"
			>
				<p>Fetching</p>
				{#if instanceRule.fetch}
					<IconCheck size="14px" />
				{:else}
					<IconX size="14px" />
				{/if}
			</div>
			<div
				class={'state ' + instanceRule.return}
				title="Whether or not to will return content to this instance"
			>
				<p>Returning</p>
				{#if instanceRule.return}
					<IconCheck size="14px" />
				{:else}
					<IconX size="14px" />
				{/if}
			</div>
		</div>
	</div>
{/if}

<style lang="scss" scoped>
	@media (max-width: 550px) {
		.label {
			display: none;
		}
	}

	.instanceRule {
		display: flex;
		align-items: center;
		flex-direction: column;

		gap: 10px;

		padding: 12px;
		transition: 0.1s;

		&:hover {
			border-radius: var(--br-md);
			background-color: var(--bg3-25);
		}

		.top {
			display: flex;
			align-items: center;
			width: 100%;

			.start {
				flex-grow: 1;
				display: flex;
				align-items: center;
				gap: 8px;
			}

			.end {
				display: flex;
				align-items: center;
				gap: 8px;
				margin-left: 15px;
			}
		}

		.btm {
			display: flex;
			align-items: center;
			gap: 8px;
			width: 100%;

			.state {
				display: inline-flex;
				align-items: center;
				flex-wrap: wrap;
				gap: 4px;

				user-select: none;
				cursor: help;

				font-size: var(--fs-md);

				p {
					width: 100%;
				}

				&.true {
					color: var(--success);
				}
				&.false {
					color: var(--danger);
				}
			}
		}
	}
</style>
