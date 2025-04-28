<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import localizedString from '$lib/localizedString';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import LocalizedString from '$lib/components/LocalizedString.svelte';

	let error = $state(false);
	let errorMsg = $state('');

	let username = $state('');
	let password = $state('');
</script>

<PageHeader title={localizedString('register')}></PageHeader>

<PageWrapper centered>
	<div class="ctn">
		<h1>
			<LocalizedString id="register" />
		</h1>
		<p>{errorMsg}</p>
		<form>
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

			<div class="btns">
				<div class="left">
					<Button submit accent on:click={() => {}}>
						<LocalizedString id="register" />
					</Button>
				</div>
			</div>
		</form>
	</div>
</PageWrapper>
