import { FluentBundle, FluentResource } from '@fluent/bundle';

import translationFile from 'shared/locale/en.ftl?raw';

const bundle = new FluentBundle('en');
const resource = new FluentResource(translationFile);
bundle.addResource(resource);

export default bundle;
