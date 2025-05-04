<script lang="ts">
	import getAdminUsers from '$lib/api/admin/users/get.js';
	import getNotifications from '$lib/api/notifications/get.js';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import Timeline from '$lib/components/Timeline.svelte';

	let query: any = $state();
</script>

<Timeline
	type="userAdmin"
	queryKey="admin-user"
	queryFn={getAdminUsers}
	bind:query
/>
