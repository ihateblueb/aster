<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
</script>

<PageHeader>Style Testing Page</PageHeader>

<PageWrapper>
	<h1>Header 1</h1>
	<h2>Header 2</h2>
	<h3>Header 3</h3>
	<h4>Header 4</h4>
	<h5>Header 5</h5>
	<h6>Header 6</h6>
	<p>Paragraph</p>
	<small>Small</small>

	<div class="brTest mn">Border Radius Test (mn)</div>
	<div class="brTest xxs">Border Radius Test (xxs)</div>
	<div class="brTest xs">Border Radius Test (xs)</div>
	<div class="brTest sm">Border Radius Test (sm)</div>
	<div class="brTest md">Border Radius Test (md)</div>
	<div class="brTest lg">Border Radius Test (lg)</div>
	<div class="brTest xl">Border Radius Test (xl)</div>
	<div class="brTest xxl">Border Radius Test (xxl)</div>
	<div class="brTest mx">Border Radius Test (mx)</div>
</PageWrapper>

<style lang="scss">
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
