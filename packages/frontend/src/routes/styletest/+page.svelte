<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Button from '$lib/components/Button.svelte';
	import { IconCube } from '@tabler/icons-svelte';
	import Input from '$lib/components/Input.svelte';
	import Switch from '$lib/components/Toggle.svelte';
	import Mfm from '$lib/components/Mfm.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import UserDropdown from '$lib/components/dropdowns/UserDropdown.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';

	let inputtest = $state('');
	let switchtest = $state(false);

	let modal: Modal;
	let userDropdown: Dropdown;
</script>

<PageHeader title="Style Testing Page">
	{inputtest}
</PageHeader>

<PageWrapper>
	<h1>Header 1</h1>
	<h2>Header 2</h2>
	<h3>Header 3</h3>
	<h4>Header 4</h4>
	<h5>Header 5</h5>
	<h6>Header 6</h6>
	<p>Paragraph</p>
	<small>Small</small>

	<Avatar user={{ local: true, username: 'test' }} />

	<Switch bind:checked={switchtest}></Switch>

	<Input
		placeholder="Sample Input (default)"
		label="Sample Input Label"
		bind:value={inputtest}
	/>
	<Input
		placeholder="Sample Input (nm)"
		label="Sample Input Label"
		bind:value={inputtest}
		nm
	/>
	<Input
		placeholder="Sample Input (wide)"
		label="Sample Input Label"
		bind:value={inputtest}
		wide
	/>
	<Input
		placeholder="Sample Input (big)"
		label="Sample Input Label"
		bind:value={inputtest}
		big
	/>

	<Mfm content={inputtest}></Mfm>

	<Button on:click={(e) => userDropdown.open(e)}>
		<IconCube size="var(--fs-lg)" />
		Sample Button (default)
	</Button>

	<Button primary>
		<IconCube size="var(--fs-lg)" />
		Sample Button (primary)
	</Button>
	<Button secondary>
		<IconCube size="var(--fs-lg)" />
		Sample Button (secondary)
	</Button>
	<Button tertiary>
		<IconCube size="var(--fs-lg)" />
		Sample Button (tertiary)
	</Button>
	<Button quaternary>
		<IconCube size="var(--fs-lg)" />
		Sample Button (quaternary)
	</Button>
	<Button accent>
		<IconCube size="var(--fs-lg)" />
		Sample Button (accent)
	</Button>
	<Button success>
		<IconCube size="var(--fs-lg)" />
		Sample Button (success)
	</Button>
	<Button warn>
		<IconCube size="var(--fs-lg)" />
		Sample Button (warn)
	</Button>
	<Button danger>
		<IconCube size="var(--fs-lg)" />
		Sample Button (danger)
	</Button>
	<Button rounded>
		<IconCube size="var(--fs-lg)" />
		Sample Button (rounded)
	</Button>
	<Button wide>
		<IconCube size="var(--fs-lg)" />
		Sample Button (wide)
	</Button>

	<div class="brTest mn">Border Radius Test (mn)</div>
	<div class="brTest xxs">Border Radius Test (xxs)</div>
	<div class="brTest xs">Border Radius Test (xs)</div>
	<div class="brTest sm">Border Radius Test (sm)</div>
	<div class="brTest md">Border Radius Test (md)</div>
	<div class="brTest lg">Border Radius Test (lg)</div>
	<div class="brTest xl">Border Radius Test (xl)</div>
	<div class="brTest xxl">Border Radius Test (xxl)</div>
	<div class="brTest mx">Border Radius Test (mx)</div>

	<Loading />
</PageWrapper>

<UserDropdown bind={userDropdown} user={{ username: 'test' }} />

<style lang="scss" scoped>
	.brTest {
		margin-top: 5px;
		margin-bottom: 5px;

		padding: 25px 50px;

		width: 200px;

		background: var(--ac1-25);

		&.mn {
			border-radius: var(--br-mn);
		}
		&.xxs {
			border-radius: var(--br-xxs);
		}
		&.xs {
			border-radius: var(--br-xs);
		}
		&.sm {
			border-radius: var(--br-sm);
		}
		&.md {
			border-radius: var(--br-md);
		}
		&.lg {
			border-radius: var(--br-lg);
		}
		&.xl {
			border-radius: var(--br-xl);
		}
		&.xxl {
			border-radius: var(--br-xxl);
		}
		&.mx {
			border-radius: var(--br-mx);
		}
	}
</style>
