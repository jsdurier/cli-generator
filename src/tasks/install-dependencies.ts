import { installDependencies as genericInstallDependencies } from '../utils/install-dependencies';

import { ALL_DEFAULT_DEPENDENCIES } from './default-dependencies';

export async function installDependencies(): Promise<void> {
	return genericInstallDependencies(
		'',
		ALL_DEFAULT_DEPENDENCIES
	);
}
