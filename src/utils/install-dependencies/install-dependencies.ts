import { mergeObjects } from '../merge-objects';
import { readPackageJson } from '../read-package-json';

import { IAllDependencies } from './i-all-dependencies';
import { install } from './install';

const DEPENDENCIES = 'dependencies';
const DEV_DEPENDENCIES = 'devDependencies';

/**
 * Install dependencies in package.json at root
 */
export async function installDependencies(
	rootDirPath: string,
	defaultDependencies: IAllDependencies
): Promise<void> {
	const projectDependencies = await getProjectDependencies(rootDirPath);
	const allDependencies = mergeObjects(
		projectDependencies,
		defaultDependencies
	);
	return install(
		rootDirPath,
		allDependencies
	);
}

async function getProjectDependencies(rootDirPath: string): Promise<IAllDependencies> {
	const packageJsonContent = await readPackageJson(rootDirPath);
	return {
		dependencies: packageJsonContent[DEPENDENCIES],
		devDependencies: packageJsonContent[DEV_DEPENDENCIES]
	};
}
