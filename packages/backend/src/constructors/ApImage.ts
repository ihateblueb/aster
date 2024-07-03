export default class ApImage {
	readonly type: 'Image';
	url?: string;
	description?: string;
	sensitive?: boolean = false;

	constructor(url, description, sensitive) {
		this.url = url;
		this.description = description;
		this.sensitive = sensitive;
	}

	build() {
		return this;
	}
}
