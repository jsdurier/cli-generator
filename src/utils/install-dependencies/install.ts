import path from 'path';

import { Directory } from '../directory';
import { fsAsync } from '../fs-async';
import { runCommand } from '../run-command';

import {
	IFilesTree
} from './files-tree';
import { AbstractFolderTreeCreator } from './folder-tree-creator';
import { IAllDependencies } from './i-all-dependencies';

const CONFIG = '.config';
const PNPM_LOCK_FILE_NAME = 'pnpm-lock.yaml';
const PNPM_INSTALL_COMMAND = 'pnpm i';
const PACKAGE_JSON = 'package.json';

class Tree extends AbstractFolderTreeCreator<IAllDependencies> {
	protected getTreeConfiguration(): IFilesTree<IAllDependencies> {
		return {
			[CONFIG]: {
				[PACKAGE_JSON]: () => this.createPackageJson()
			}
		}
	}

	private createPackageJson(): string {
		return JSON.stringify(
			this._arg,
			null,
			2
		);
	}
}

/**
 * First installation of dependencies
 */
export async function install(
	rootDir: string,
	dependencies: IAllDependencies = {}
): Promise<void> {
	const dir = new Directory(rootDir);
	const tree = new Tree(
		rootDir,
		dependencies
	);
	await tree.create();
	await copyPnpmLock(dir);
	await runCommand(`cd ${dir.getPath(CONFIG)} && ${PNPM_INSTALL_COMMAND}`);
	await Promise.all([
		moveNodeModules(dir),
		movePnpmLockFile(dir),
		removeConfigDir(dir)
	]);
}

async function copyPnpmLock(dir: Directory): Promise<void> {
	copyFileIfExists(
		dir,
		[
			PNPM_LOCK_FILE_NAME
		],
		[
			CONFIG,
			PNPM_LOCK_FILE_NAME
		]
	);
}

async function movePnpmLockFile(dir: Directory): Promise<void> {
	return move(
		dir,
		PNPM_LOCK_FILE_NAME
	);
}

async function moveNodeModules(dir: Directory): Promise<void> {
	return move(
		dir,
		'node_modules'
	);
}

async function move(
	dir: Directory,
	fileName: string
): Promise<void> {
	return fsAsync.rename(
		dir.getPath(
			CONFIG,
			fileName
		),
		dir.getPath(fileName)
	);
}

async function removeConfigDir(dir: Directory): Promise<void> {
	const filePath = dir.getPath(
		CONFIG
	);
	await fsAsync.rm(
		filePath,
		{ recursive: true }
	);
}

async function copyFileIfExists(
	rootDir: Directory,
	srcFilePath: string[],
	targetFilePath: string[]
): Promise<void> {
	const srcPath = rootDir.getPath(...srcFilePath);
	try {
		const stat = await fsAsync.stat(srcPath);
	} catch (err) {
		return;
	}
	await fsAsync.copyFile(
		srcPath,
		path.join(...targetFilePath)
	);
}
