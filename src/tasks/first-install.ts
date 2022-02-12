import { install } from '../utils/install-dependencies';

import { ALL_DEFAULT_DEPENDENCIES } from './default-dependencies';

export async function firstInstall(): Promise<void> {
	install(
		'',
		ALL_DEFAULT_DEPENDENCIES
	);
}
