
import path from 'path';

import { fsAsync } from '../utils/fs-async';
import { runCommand } from '../utils/run-command';

import {
	IFilesTree,
	writeTree
} from './files-tree';
import {
	getDependencies,
	getDevDependencies
} from './get-dependencies';
import { IDependencies } from './i-dependencies';

const CONFIG = '.config';
const PNPM_LOCK_FILE_NAME = 'pnpm-lock.yaml';

const tree: IFilesTree<IAllDependencies> = {
	'.config': {
		// 'tsconfig.json': getTsconfig,
		'package.json': getPackageJson
	}
};

interface IAllDependencies {
	dependencies?: IDependencies;
	devDependencies?: IDependencies;
}

/**
 * First installation of dependencies
 */
export async function install(
	rootDir: string,
	dependencies: IAllDependencies = {}
): Promise<void> {
	await writeTree(
		rootDir,
		tree,
		dependencies
	);
	await runCommand(`cd ${path.join(rootDir, CONFIG)} && pnpm i`);
	await Promise.all([
		moveNodeModules(rootDir),
		movePnpmLockFile(rootDir)
	]);
}

function getPackageJson(dependencies: IAllDependencies): string {
	const res = {
		dependencies: getDependencies(dependencies.dependencies),
		devDependencies: getDevDependencies(dependencies.devDependencies)
	};
	return JSON.stringify(
		res,
		null,
		2
	);
}

async function movePnpmLockFile(rootDirPath: string): Promise<void> {
	return move(
		rootDirPath,
		PNPM_LOCK_FILE_NAME
	);
}

async function moveNodeModules(rootDirPath: string): Promise<void> {
	return move(
		rootDirPath,
		'node_modules'
	);
}

async function move(
	rootDirPath: string,
	fileName: string
): Promise<void> {
	return fsAsync.rename(
		path.join(
			rootDirPath,
			CONFIG,
			fileName
		),
		path.join(
			rootDirPath,
			fileName
		)
	);
}
