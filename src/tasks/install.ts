
import path from 'path';

import { fsAsync } from '../utils/fs-async';
import { runCommand } from '../utils/run-command';

import {
	IFilesTree,
	writeTree
} from './files-tree';

const CONFIG = '.config';
const DEPENDENCIES = {
	"sade": "^1.8.1"
};
const DEV_DEPENDENCIES = {
	"@types/node": "^17.0.17",
	"@types/sade": "^1.7.4",
	"rimraf": "^3.0.2"
};

const tree: IFilesTree<IDependencies> = {
	'.config': {
		// 'tsconfig.json': getTsconfig,
		'package.json': getPackageJson
	}
};

interface IDependencies {
	dependencies?: { [key: string]: string };
	devDependencies?: { [key: string]: string };
}

/**
 * First installation of dependencies
 */
export async function install(
	rootDir: string,
	dependencies: IDependencies = {}
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

function getPackageJson(dependencies: IDependencies): string {
	const res = {
		dependencies: mergeDependencies(
			dependencies.dependencies,
			DEPENDENCIES
		),
		devDependencies: mergeDependencies(
			dependencies.devDependencies,
			DEV_DEPENDENCIES
		)
	};
	return JSON.stringify(
		res,
		null,
		2
	);
}

function mergeDependencies(
	value1: unknown | undefined,
	value2: unknown
) {
	return Object.assign(
		value1 ?? {},
		value2
	);
}

const PNPM_LOCK_FILE_NAME = 'pnpm-lock.yaml';

async function movePnpmLockFile(rootDirPath: string): Promise<void> {
	const filePath = path.join(
		rootDirPath,
		CONFIG,
		PNPM_LOCK_FILE_NAME
	);
	fsAsync.rename(
		filePath,
		path.join(
			rootDirPath,
			PNPM_LOCK_FILE_NAME
		)
	);
}

async function moveNodeModules(rootDir: string): Promise<void> {
	return fsAsync.rename(
		path.join(
			rootDir,
			CONFIG,
			'node_modules'
		),
		path.join(
			rootDir,
			'node_modules'
		)
	);
}
