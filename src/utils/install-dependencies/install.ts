
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

class Tree extends AbstractFolderTreeCreator<IAllDependencies> {
	protected getTreeConfiguration(): IFilesTree<IAllDependencies> {
		return {
			'.config': {
				'package.json': () => this.createPackageJson(),
				'pnpm-lock.yaml': () => this.createPnpmLock()
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

	private createPnpmLock(): string {
		// TODO read rootDir/pnpm-lock.yaml
		return 'toto';
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
	await runCommand(`cd ${dir.getPath(CONFIG)} && ${PNPM_INSTALL_COMMAND}`);
	await Promise.all([
		moveNodeModules(dir),
		movePnpmLockFile(dir) // TODO écraser l'ancien s'il existe
	]);
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
