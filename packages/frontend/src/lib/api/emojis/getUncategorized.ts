import https from '$lib/https.js';

export default function getEmojisUncategorized() {
	return https.get(`/api/emojis?categorize=false`, true);
}
