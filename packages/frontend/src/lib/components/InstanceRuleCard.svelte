<script>
	import Input from '$lib/components/Input.svelte';
	import { IconCheck, IconPencil, IconX } from '@tabler/icons-svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import Button from '$lib/components/Button.svelte';
	import updateAdminFederationRules from '$lib/api/admin/federation/rules/update';

	export let instanceRule;
	let newInstanceRule;

	let editing = false;
	let deleted = false;

	newInstanceRule = instanceRule;

	function toggleEdit() {
		if (editing) {
			newInstanceRule = instanceRule;
			editing = false;
			updateAdminFederationRules([newInstanceRule]);
		} else {
			newInstanceRule = instanceRule;
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
						<IconCheck size="var(--fs-lg)" />
						<span class="label">Save</span>
					{:else}
						<IconPencil size="var(--fs-lg)" />
						<span class="label">Edit</span>
					{/if}
				</Button>
				<Button nm on:click={() => deleteRule()}>
					<IconX size="var(--fs-lg)" />
					<span class="label">Delete</span>
				</Button>
			</div>
		</div>
		{#if !editing}
			<div class="btm">
				<div
					class={'state ' + instanceRule.sensitive}
					title="Whether or not users from this instance will be marked as sensitive"
				>
					<p>Sensitive</p>
					{#if instanceRule.sensitive}
						<IconCheck size="var(--fs-md)" />
					{:else}
						<IconX size="var(--fs-md)" />
					{/if}
				</div>
				<div
					class={'state ' + instanceRule.deliver}
					title="Whether or not activities wil be delivered to this instance"
				>
					<p>Delivering</p>
					{#if instanceRule.deliver}
						<IconCheck size="var(--fs-md)" />
					{:else}
						<IconX size="var(--fs-md)" />
					{/if}
				</div>
				<div
					class={'state ' + instanceRule.accept}
					title="Whether or not activities will be accepted from this instance"
				>
					<p>Accepting</p>
					{#if instanceRule.accept}
						<IconCheck size="var(--fs-md)" />
					{:else}
						<IconX size="var(--fs-md)" />
					{/if}
				</div>
				<div
					class={'state ' + instanceRule.fetch}
					title="Whether or not to try fetching content from this instance"
				>
					<p>Fetching</p>
					{#if instanceRule.fetch}
						<IconCheck size="var(--fs-md)" />
					{:else}
						<IconX size="var(--fs-md)" />
					{/if}
				</div>
				<div
					class={'state ' + instanceRule.return}
					title="Whether or not to will return content to this instance"
				>
					<p>Returning</p>
					{#if instanceRule.return}
						<IconCheck size="var(--fs-md)" />
					{:else}
						<IconX size="var(--fs-md)" />
					{/if}
				</div>
			</div>
		{:else}
			<div class="btm">
				<div
					class={'state ' + instanceRule.sensitive}
					title="Whether or not users from this instance will be marked as sensitive"
				>
					<p>Sensitive</p>
					<Toggle checked={instanceRule.sensitive} />
				</div>
				<div
					class={'state ' + instanceRule.deliver}
					title="Whether or not activities wil be delivered to this instance"
				>
					<p>Delivering</p>
					<Toggle checked={instanceRule.deliver} />
				</div>
				<div
					class={'state ' + instanceRule.accept}
					title="Whether or not activities will be accepted from this instance"
				>
					<p>Accepting</p>
					<Toggle checked={instanceRule.accept} />
				</div>
				<div
					class={'state ' + instanceRule.fetch}
					title="Whether or not to try fetching content from this instance"
				>
					<p>Fetching</p>
					<Toggle checked={instanceRule.fetch} />
				</div>
				<div
					class={'state ' + instanceRule.return}
					title="Whether or not to will return content to this instance"
				>
					<p>Returning</p>
					<Toggle checked={instanceRule.return} />
				</div>
			</div>
		{/if}
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
