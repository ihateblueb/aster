<script lang="ts">
	import getMeta from '$lib/api/meta/get';
	import { createQuery } from '@tanstack/svelte-query';
    
    const query = createQuery({
		queryKey: ['meta'],
		retry: false,
		queryFn: async () => await getMeta()
	});
</script>

<div>
    {#if $query.isSuccess}
        <p>{$query.data?.software ?? 'aster'} {$query.data?.version ?? 'unknown version'}</p>
        <p>
            <a href='/about'>About</a> &bull; <a  href='/source'>Source code</a> &bull; <a>link</a>
        </p>
    {/if}
</div>