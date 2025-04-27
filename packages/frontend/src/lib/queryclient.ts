import { QueryClient } from '@tanstack/svelte-query';

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
	queries: {
		retry: true,
		retryDelay: 30
	}
});

export default queryClient;
