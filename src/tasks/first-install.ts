import { install } from '../utils/install-dependencies';

import { ALL_DEFAULT_DEPENDENCIES } from './default-dependencies';

export async function firstInstall(rootDirPath: string): Promise<void> {
	install(
		rootDirPath,
		ALL_DEFAULT_DEPENDENCIES
	);
}
