<script lang="ts">
	import { locale } from '$lib/locale';

	import PageHeader from '$lib/components/PageHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<template>
	<div class="pageContent">
		<div class="paddedPage _0VO5sC1">
			<div class="textMargins">
				<h2>{locale('home')}</h2>
			</div>
			<div class="stats">
				<div class="stat">
					<div class="left first">
						<Icon name="user" size="18px" />
					</div>
					<div class="right">
						<b>Users</b>
						<p>0</p>
					</div>
				</div>
				<div class="stat">
					<div class="left second">
						<Icon name="note" size="18px" />
					</div>
					<div class="right">
						<b>Notes</b>
						<p>0</p>
					</div>
				</div>
			</div>
			<div class="stats">
				<div class="stat">
					<div class="left third">
						<Icon name="planet" size="18px" />
					</div>
					<div class="right">
						<b>Instances</b>
						<p>0</p>
					</div>
				</div>
				<div class="stat">
					<div class="left fourth">
						<Icon name="flag" size="18px" />
					</div>
					<div class="right">
						<b>Reports</b>
						<p>0</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
