<script>
	import adminFederationGet from '$lib/api/admin/instances/get';
	import Loading from '$lib/components/Loading.svelte';
	import { locale } from '$lib/locale';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<template>
	<div class="pageContent">
		<div class="paddedPage textMargins">
			<h2>{locale('federation')}</h2>
			{#await adminFederationGet()}
				<div class="loading">
					<Loading />
				</div>
			{:then instances}
				{#if instances}
					{#each instances as instance}
						<div class="instance">
							<div class="top">
								<div class="left">
									<img src={instance.icon} class="icon" />
									<b
									>{instance.name
										? instance.name
										: instance.host}</b
									>
									<span>
									{instance.software}
										{instance.version}
								</span>
								</div>
								<div class="right">
									<Button to={'/admin/federation/'+instance.host}>
										<Icon name="chevron-right" size="16px" />
									</Button>
								</div>
							</div>
							{#if instances.mod_note}
								<div class="bottom">
									<hr>
									{instance.mod_note}
								</div>
							{/if}
						</div>
					{/each}
				{/if}
			{/await}
		</div>
	</div>
</template>

<style lang="scss">
	.instance {
		display: flex;
		padding: 12px 16px;
		gap: 5px;
		flex-direction: column;
		border-radius: var(--border-l);
		margin-bottom: 10px;

		background-color: var(--bg-secondary);

		.top {
			display: flex;
			gap: 10px;

			.left {
				display: flex;
				align-items: center;
				gap: 5px;
				flex-grow: 2;

				.icon {
					height: 25px;
					width: 25px;
					margin-right: 5px;
				}
			}

			.right {
				display: flex;
				align-items: center;
				gap: 5px;
			}
		}

		.bottom {
			display: flex;
			flex-direction: column;
			gap: 10px;

			hr {
				width: calc(100% - 10px);
				margin: 0 5px;
				border-color: var(--bg-accent);
			}

			.stats {
				display: flex;
				gap: 10px;
			}
		}
	}
</style>
