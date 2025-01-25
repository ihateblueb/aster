<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import tryLogin from '$lib/api/login';
	import localstore from '$lib/localstore';
	import store from '$lib/store';
	import { goto } from '$app/navigation';
	import getUser from '$lib/api/user/get';

	let error = $state(false);
	let errorMsg = $state('');

	let username = $state('');
	let password = $state('');

	async function login() {
		await tryLogin(username, password)
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
</script>

<PageHeader title="Login"></PageHeader>

<PageWrapper centered>
	<div class="ctn">
		<h1>Login</h1>
		<p>{errorMsg}</p>
		<form>
			<Input
				type="username"
				placeholder="Username"
				bind:value={username}
				required
			/>
			<Input
				type="password"
				placeholder="Password"
				bind:value={password}
				required
			/>

			<div class="btns">
				<div class="left">
					<Button submit accent on:click={() => login()}>
						Login
					</Button>
				</div>
				<div class="right">
					<a href="/forgot-password">Forgot password</a>
				</div>
			</div>
		</form>
	</div>
</PageWrapper>

<style lang="scss" scoped>
	.ctn {
		display: flex;
		flex-direction: column;

		h1 {
			font-size: var(--fs-xl);
			margin-bottom: 12px;
		}

		.btns {
			display: flex;
			align-items: center;
			margin-top: 5px;

			.left {
				display: flex;
				flex-grow: 1;
			}
			.right {
				display: flex;
			}
		}
	}
</style>
