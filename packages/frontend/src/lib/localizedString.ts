import translations from '$lib/translations.js';

export default function localizedString(id: string, args?: any) {
	const value = translations.getMessage(id)?.value;
	return value ? translations.formatPattern(value, args) : id;
}
