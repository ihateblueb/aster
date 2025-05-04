<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import localizedString from '$lib/localizedString';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import LocalizedString from '$lib/components/LocalizedString.svelte';
	import tryLogin from '$lib/api/login.js';
	import localstore from '$lib/localstore.js';
	import getUser from '$lib/api/user/get.js';
	import store from '$lib/store.js';
	import { goto } from '$app/navigation';
	import tryRegister from '$lib/api/register.js';
	import { createQuery, QueryObserver } from '@tanstack/svelte-query';
	import queryClient from '$lib/queryclient.js';
	import getMeta from '$lib/api/meta/get.js';
	import Error from '$lib/components/Error.svelte';
	import Loading from '$lib/components/Loading.svelte';

	let error = $state(false);
	let errorMsg = $state('');

	let username = $state('');
	let password = $state('');
	let invite = $state(undefined);

	async function register() {
		await tryRegister(username, password, invite)
			.then(async (e) => {
				console.log(e);

				localstore.set('token', e.token);
				document.cookie =
					'authorization=Bearer ' + e.token + '; path=/';

				await getUser(e.id)
					.then((self) => {
						localstore.set('self', JSON.stringify(self));
					})
					.catch((err) => {
						error = true;
						errorMsg = 'Cannot fetch self: ' + err.message;
					});

				store.selfRefresh.set(true);
				await goto('/');

				store.appReload.set(true);
			})
			.catch((err) => {
				error = true;
				errorMsg = err.message;
			});
	}

	const query = createQuery({
		queryKey: ['meta'],
		retry: false,
		refetchOnWindowFocus: false,
		staleTime: 60000,
		queryFn: async () => await getMeta()
	});
</script>

<PageHeader title={localizedString('register')}></PageHeader>

<PageWrapper centered>
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
		<div class="ctn">
			<h1>
				<LocalizedString id="register" />
			</h1>
			<p>{errorMsg}</p>
			<form>
				{#snippet userAndPass()}
					<Input
						type="username"
						placeholder={localizedString('username')}
						bind:value={username}
						required
					/>
					<Input
						type="password"
						placeholder={localizedString('password')}
						bind:value={password}
						required
					/>
				{/snippet}

				{#if $query.data.registrations === 'closed'}
					<p>This instance has registrations closed.</p>
				{:else}
					{@render userAndPass()}
					{#if $query.data.registrations === 'invite'}
						<Input
							placeholder={localizedString('invite')}
							bind:value={invite}
							required
						/>
					{/if}

					<div class="btns">
						<div class="left">
							<Button submit accent on:click={register}>
								<LocalizedString id="register" />
							</Button>
						</div>
					</div>
				{/if}
			</form>
		</div>
	{/if}
</PageWrapper>
