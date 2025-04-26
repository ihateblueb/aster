import { FluentBundle, FluentResource } from '@fluent/bundle';

import translationFile from 'shared/locale/en-US.ftl?raw';

const bundle = new FluentBundle('en-US');
const resource = new FluentResource(translationFile);
bundle.addResource(resource);

export default bundle;
