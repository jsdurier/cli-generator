import { installFromPackageJson } from './install-from-package-json';

export async function installDependencies(): Promise<void> {
	return installFromPackageJson('');
}
