<script>
	import { page } from '$app/stores';
	import Avatar from '$lib/components/Avatar.svelte';

	export let data;
</script>

{#if data}
	<div class="userHeader">
		<img class="banner" src={data.banner} />
		<div class="innerHeader">
			<Avatar {data} size="75px" />
			<div class="name">
				<span class="displayname">{data.displayname}</span>
				<span class="username">@{data.username}</span>
			</div>
			<p class="bio">{data.bio}</p>
		</div>
	</div>
{:else}
	<h1>User not found</h1>
{/if}

<style lang="scss">
	.userHeader {
		.banner {
			height: 165px;
			width: 100%;
			object-fit: cover;
			background-color: var(--bg-secondary);
		}
		.innerHeader {
			padding: 12px;
			margin-top: -45px;

			.name {
				margin-bottom: 10px;
				> span {
					display: block;
					margin: 2.5px 0px 2.5px 0px;
					&.displayname {
						margin-top: 10px;
						font-weight: 700;
						font-size: 18px;
					}
				}
			}

			.bio {
				margin: 5px 0px 5px 0px;
			}
		}
	}
</style>
