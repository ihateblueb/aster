<script>
	import queueGet from '$lib/api/queue/get';
	import Button from '$lib/components/Button.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { locale } from '$lib/locale';

	let queues = queueGet();

	setInterval(() => {
		queues = queueGet();
	}, 10000);
</script>

<template>
	<div class="pageContent">
		<div class="paddedPage textMargins">
			<h2>{locale('queue')}</h2>
			<Button to="/admin/queue/dashboard">
				<Icon name="external-link" size="18px" margin="0px 6px 0px 0px"
				></Icon>
				{locale('dashboard')}
			</Button>
			{#key queues}
				{#await queues}
					<div class="loading">
						<Loading />
					</div>
				{:then queues}
					{#if queues}
						{#each queues.queues as queue}
							<h3>{locale('queue_' + queue.name)}</h3>
							<div class="stats">
								<div class="stat">
									<div class="left active">
										<Icon name="clock-cog" size="18px" />
									</div>
									<div class="right">
										<b>Active</b>
										<p>{queue.counts.active}</p>
									</div>
								</div>
								<div class="stat">
									<div class="left completed">
										<Icon name="clock-check" size="18px" />
									</div>
									<div class="right">
										<b>Completed</b>
										<p>{queue.counts.completed}</p>
									</div>
								</div>
								<div class="stat">
									<div class="left delayed">
										<Icon
											name="clock-exclamation"
											size="18px"
										/>
									</div>
									<div class="right">
										<b>Delayed</b>
										<p>{queue.counts.delayed}</p>
									</div>
								</div>
								<div class="stat">
									<div class="left failed">
										<Icon name="clock-x" size="18px" />
									</div>
									<div class="right">
										<b>Failed</b>
										<p>{queue.counts.failed}</p>
									</div>
								</div>
							</div>
						{/each}
					{/if}
				{/await}
			{/key}
		</div>
	</div>
</template>

<style lang="scss">
	.stats {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 10px;
		margin-bottom: 25px;

		> .stat {
			display: flex;
			gap: 10px;
			background-color: var(--bg-secondary);
			border-radius: var(--border-m);
			padding: 12px;
			width: calc(50% - 5px);
			box-sizing: border-box;

			.left {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: var(--accent-20);
				color: var(--accent);
				border-radius: var(--border-m);
				width: 35px;
				height: 35px;

				&.active {
					background-color: var(--accent-1-20);
					color: var(--accent-1);
				}

				&.completed {
					background-color: var(--success-20);
					color: var(--success);
				}

				&.delayed {
					background-color: var(--warn-20);
					color: var(--warn);
				}

				&.failed {
					background-color: var(--danger-20);
					color: var(--danger);
				}
			}
			.right {
				b {
					font-size: var(--font-m);
				}
			}
		}
	}
	.loading {
		display: flex;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		padding: 25px;
	}
</style>
