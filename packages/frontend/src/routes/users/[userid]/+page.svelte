<script>
	import { page } from '$app/stores';

	export let data;
</script>

<div class="userHeader">
	<img class="banner" src="{data.banner}">
	<div class="innerHeader">
		<img class="avatar" src="{data.avatar}">
		<div class="name">
			<span class="displayname">{data.displayname}</span>
			<span class="username">@{data.username}</span>
		</div>
		<p>{data.bio}</p>
	</div>
</div>

<style lang="scss">
	.userHeader {
		.banner {
			height: 125px;
			width: 100%;
			object-fit: cover;
		}
		.innerHeader {
			padding: 12px;
			margin-top: -45px;
			.avatar {
			height: 55px;
			width: 55px;
			border-radius: 10px;
			border: 4px solid var(--bg-primary);
			margin-left: -4px;
		}
		.name {
			> span {
				display: block;
				&.displayname {
					font-weight: 700;
					font-size: 18px;
				}
			}
		}
		}
	}
</style>
