import { install } from './install';
import { readPackageJson } from './read-package-json';

/**
 * Install dependencies in package.json at root
 */
export async function installFromPackageJson(rootDirPath: string): Promise<void> {
	const packageJsonContent = await readPackageJson(rootDirPath);
	const dependencies = {
		dependencies: packageJsonContent.dependencies,
		devDependencies: packageJsonContent.devDependencies
	};
	return install(
		rootDirPath,
		dependencies
	);
}
