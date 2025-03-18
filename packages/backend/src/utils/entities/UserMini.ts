export default function UserMini(alias?: string) {
	if (alias) alias = alias + '.';
	return [
		alias + 'id',
		alias + 'username',
		alias + 'host',
		alias + 'displayName',
		alias + 'emojis',
		alias + 'avatar',
		alias + 'avatarAlt',
		alias + 'banner',
		alias + 'bannerAlt',
		alias + 'isCat',
		alias + 'sensitive',
		alias + 'local',
		alias + 'pronouns'
	];
}
