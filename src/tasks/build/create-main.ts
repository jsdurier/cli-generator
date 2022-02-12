import { APP_DIRNAME } from './app-dirname';
import { IAppInfo } from './i-app-info';

export function createMain(
appInfo: IAppInfo
): string {
	return `#!/usr/bin/env node
import sade from 'sade';
import { main } from './${APP_DIRNAME}/cli';

const NAME = '${appInfo.name}';
const VERSION = '${appInfo.version}';

const app = sade(NAME).version(VERSION);
main(app);
app.parse(process.argv);
`;
}
