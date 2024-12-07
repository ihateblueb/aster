<script lang="ts" ✂prettier:content✂="CglpbXBvcnQgUGFnZVdyYXBwZXIgZnJvbSAnJGxpYi9jb21wb25lbnRzL1BhZ2VXcmFwcGVyLnN2ZWx0ZSc7CglpbXBvcnQgUGFnZUhlYWRlciBmcm9tICckbGliL2NvbXBvbmVudHMvUGFnZUhlYWRlci5zdmVsdGUnOwoKCWltcG9ydCB7IGNyZWF0ZVF1ZXJ5IH0gZnJvbSAnQHRhbnN0YWNrL3N2ZWx0ZS1xdWVyeSc7CglpbXBvcnQgRXJyb3IgZnJvbSAnJGxpYi9jb21wb25lbnRzL0Vycm9yLnN2ZWx0ZSc7CglpbXBvcnQgTG9hZGluZyBmcm9tICckbGliL2NvbXBvbmVudHMvTG9hZGluZy5zdmVsdGUnOwoJaW1wb3J0IEF2YXRhciBmcm9tICckbGliL2NvbXBvbmVudHMvQXZhdGFyLnN2ZWx0ZSc7CglpbXBvcnQgewoJCUljb25DYWtlLAoJCUljb25NYXBQaW4sCgkJSWNvblBpbiwKCQlJY29uVXNlckNpcmNsZQoJfSBmcm9tICdAdGFibGVyL2ljb25zLXN2ZWx0ZSc7CglpbXBvcnQgbG9va3VwVXNlciBmcm9tICckbGliL2FwaS91c2VyL2xvb2t1cC5qcyc7CglpbXBvcnQgQnV0dG9uIGZyb20gJyRsaWIvY29tcG9uZW50cy9CdXR0b24uc3ZlbHRlJzsKCWltcG9ydCBsb2NhbHN0b3JlIGZyb20gJyRsaWIvbG9jYWxzdG9yZS5qcyc7CglpbXBvcnQgTWZtIGZyb20gJyRsaWIvY29tcG9uZW50cy9NZm0uc3ZlbHRlJzsKCglsZXQgeyBkYXRhIH0gPSAkcHJvcHMoKTsKCgljb25zb2xlLmxvZyhkYXRhKTsKCgljb25zdCBxdWVyeSA9IGNyZWF0ZVF1ZXJ5KHsKCQlxdWVyeUtleTogWyd1c2VyJ10sCgkJcmV0cnk6IGZhbHNlLAoJCXF1ZXJ5Rm46IGFzeW5jICgpID0+IGF3YWl0IGxvb2t1cFVzZXIoJ0AnICsgZGF0YS51c2VyaWQpCgl9KTsK">{}</script>

<PageHeader
	title={$query.data
		? $query.data.displayName
			? $query.data.displayName
			: $query.data.username
				? $query.data.username
				: 'User'
		: 'User'}
>
	<svelte:fragment slot="icon">
		{#if $query.isSuccess}
			{#if $query.data && $query.data.avatar}
				<Avatar small size="var(--fs-lg)" user={$query.data} />
			{:else}
				<IconUserCircle size="var(--fs-lg)" />
			{/if}
		{:else}
			<IconUserCircle size="var(--fs-lg)" />
		{/if}
	</svelte:fragment>
</PageHeader>

<PageWrapper tl>
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
			<img
				class="banner"
				src={$query.data.banner ??
					'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiPjwvc3ZnPg=='}
				alt={$query.data.bannerAlt}
			/>
			<div class="float">
				<div class="left">
					<Avatar size="65px" user={$query.data} />
					<div class="names">
						<p class="top">
							{$query.data.displayName
								? $query.data.displayName
								: $query.data.username}
						</p>
						<p class="bottom">
							@{$query.data
								.username}{#if !$query.data.local}@{$query.data
									.host}{/if}
						</p>
					</div>
				</div>
				<div class="right">
					<Button nm>Follow</Button>
				</div>
			</div>
		</div>
		<div class="lower">
			<p class="description">
				{#if $query.data.bio}
					<Mfm content={$query.data.bio} />
				{:else}
					<span class="missing"
						>This user hasn't written a bio yet.</span
					>
				{/if}
			</p>
			{#if $query.data.birthday || $query.data.location}
				<div class="pairs">
					{#if $query.data.birthday}
						<p class="pair">
							<span class="key">
								<IconCake size="var(--fs-lg)" />
							</span>
							<span class="val">
								{new Date($query.data.birthday).toLocaleString(
									undefined,
									{
										month: 'long',
										day: 'numeric',
										year: 'numeric'
									}
								)}
							</span>
						</p>
					{/if}
					{#if $query.data.location}
						<p class="pair">
							<span class="key"
							><IconMapPin size="var(--fs-lg)" /></span
							>
							<span class="val">{$query.data.location}</span>
						</p>
					{/if}
				</div>
			{/if}
			<p class="joinedOn">
				Joined {new Date($query.data.createdAt).toLocaleTimeString(
					undefined,
					{
						weekday: 'long',
						month: 'long',
						day: 'numeric',
						year: 'numeric',
						hour: 'numeric',
						minute: '2-digit',
						second: '2-digit'
					}
				)}
			</p>
			<div class="counts">
				<span class="count">
					<b>0</b> notes
				</span>
				<span class="count">
					<b>0</b> following
				</span>
				<span class="count">
					<b>0</b> followers
				</span>
			</div>
		</div>
	{/if}
</PageWrapper>

<style lang="scss" scoped ✂prettier:content✂="CgkuaGVhZGVyIHsKCQlwb3NpdGlvbjogcmVsYXRpdmU7CgkJbWFyZ2luOiAtOHB4IC04cHggMCAtOHB4OwoJCW92ZXJmbG93OiBoaWRkZW47CgoJCSY6OmFmdGVyIHsKCQkJcG9zaXRpb246IGFic29sdXRlOwoJCQljb250ZW50OiAnJzsKCgkJCXdpZHRoOiBjYWxjKDEwMCUgKyA4MHB4KTsKCQkJaGVpZ2h0OiAxMDAlOwoJCQlsZWZ0OiAtNDBweDsKCQkJdG9wOiAwOwoKCQkJYm94LXNoYWRvdzogaW5zZXQgMHB4IC00MHB4IDMwcHggdmFyKC0tYmcyKTsKCQl9CgoJCS5iYW5uZXIgewoJCQloZWlnaHQ6IDMwMHB4OwoJCQl3aWR0aDogMTAwJTsKCgkJCWJveC1zaXppbmc6IGJvcmRlci1ib3g7CgkJCW9iamVjdC1maXQ6IGNvdmVyOwoJCQl1c2VyLXNlbGVjdDogbm9uZTsKCgkJCWJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnMy0yNSk7CgkJfQoKCQkuZmxvYXQgewoJCQlkaXNwbGF5OiBmbGV4OwoJCQlwb3NpdGlvbjogYWJzb2x1dGU7CgkJCWFsaWduLWl0ZW1zOiBjZW50ZXI7CgkJCWdhcDogMTBweDsKCgkJCWJvdHRvbTogMDsKCQkJei1pbmRleDogMTA7CgoJCQltYXJnaW4tYm90dG9tOiAzMHB4OwoJCQlwYWRkaW5nOiAxMnB4OwoKCQkJd2lkdGg6IDEwMCU7CgkJCWJveC1zaXppbmc6IGJvcmRlci1ib3g7CgoJCQkubGVmdCwKCQkJLnJpZ2h0IHsKCQkJCWRpc3BsYXk6IGZsZXg7CgkJCQlhbGlnbi1pdGVtczogY2VudGVyOwoJCQkJZ2FwOiAxMHB4OwoJCQl9CgoJCQkubGVmdCB7CgkJCQlmbGV4LWdyb3c6IDE7CgoJCQkJcCB7CgkJCQkJY29sb3I6IHZhcigtLXR4MSk7CgkJCQkJdGV4dC1zaGFkb3c6CgkJCQkJCTAgMXB4IDVweCB2YXIoLS1iZzEpLAoJCQkJCQkwIC0xcHggNXB4IHZhcigtLWJnMSksCgkJCQkJCTFweCAxcHggNXB4IHZhcigtLWJnMSksCgkJCQkJCS0xcHggLTFweCA1cHggdmFyKC0tYmcxKTsKCgkJCQkJJi50b3AgewoJCQkJCQlmb250LXNpemU6IHZhcigtLWZzLXhsKTsKCQkJCQkJZm9udC13ZWlnaHQ6IGJvbGQ7CgkJCQkJfQoJCQkJfQoJCQl9CgkJfQoJfQoJLmxvd2VyIHsKCQlwYWRkaW5nOiAxOHB4IDIwcHg7CgkJbWFyZ2luOiAtOHB4IC04cHggMCAtOHB4OwoJCWJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1iZzMpOwoKCQkuZGVzY3JpcHRpb24gewoJCQkubWlzc2luZyB7CgkJCQljb2xvcjogdmFyKC0tdHgzKTsKCQkJCWZvbnQtc3R5bGU6IGl0YWxpYzsKCQkJfQoJCX0KCgkJLnBhaXJzIHsKCQkJZGlzcGxheTogZmxleDsKCQkJZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKCgkJCW1hcmdpbi10b3A6IDEwcHg7CgkJCWdhcDogNXB4OwoKCQkJLnBhaXIgewoJCQkJZGlzcGxheTogZmxleDsKCQkJCWFsaWduLWl0ZW1zOiBjZW50ZXI7CgkJCQlnYXA6IDVweDsKCgkJCQkua2V5LAoJCQkJLnZhbCB7CgkJCQkJZGlzcGxheTogZmxleDsKCQkJCQlhbGlnbi1pdGVtczogY2VudGVyOwoJCQkJCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJCQkJfQoKCQkJCS5rZXkgewoJCQkJCWZvbnQtd2VpZ2h0OiA2MDA7CgkJCQl9CgkJCX0KCQl9CgoJCS5qb2luZWRPbiB7CgkJCW1hcmdpbi10b3A6IDEwcHg7CgkJfQoKCQkuY291bnRzIHsKCQkJbWFyZ2luLXRvcDogMTBweDsKCQkJZGlzcGxheTogZmxleDsKCQkJYWxpZ24taXRlbXM6IGNlbnRlcjsKCQkJZ2FwOiAxMHB4OwoJCX0KCX0K"></style>
