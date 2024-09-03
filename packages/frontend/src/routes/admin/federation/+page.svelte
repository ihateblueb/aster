<script>
	import adminFederationGet from '$lib/api/admin/instances/get';
	import Loading from '$lib/components/Loading.svelte';
	import { locale } from '$lib/locale';
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
		border-radius: var(--border-l);
		margin-bottom: 10px;

		background-color: var(--bg-secondary);

		.left {
			display: flex;
			align-items: center;
			gap: 5px;

			.icon {
				height: 25px;
				width: 25px;
				margin-right: 5px;
			}
		}
	}
</style>
