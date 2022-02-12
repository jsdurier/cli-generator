import path from 'path';

import { fsAsync } from '../../utils/fs-async';
import { IFilesTree } from '../../utils/install-dependencies/files-tree';
import { AbstractFolderTreeCreator } from '../../utils/install-dependencies/folder-tree-creator';
import { IDependencies } from '../../utils/install-dependencies/i-dependencies';
import { mergeObjects } from '../../utils/merge-objects';
import { readPackageJson } from '../../utils/read-package-json';
import { runCommand } from '../../utils/run-command';
import { stringify } from '../../utils/stringify';
import { DEFAULT_DEPENDENCIES } from '../default-dependencies';

const CONFIG = '.config';
const DIST = 'dist';
const SRC = 'src';
const PACKAGE_JSON = 'package.json';

export async function build(): Promise<void> {
	const rootPackageJson = await readPackageJson('');
	const appName = rootPackageJson.name;
	const tree = new Tree('');
	await tree.create();
	await runBuildCommand();
	await addPackageJson(
		appName,
		rootPackageJson.dependencies
	);
}

function runBuildCommand(): Promise<void> {
	return runCommand(`cd ${CONFIG} && pnpx tsc`);
}

class Tree extends AbstractFolderTreeCreator<void> {
	protected getTreeConfiguration(): IFilesTree<void> {
		return {
			[CONFIG]: {
				'tsconfig.json': () => this.getTsconfig()
			}
		};
	}

	private getTsconfig(): string {
		return `{
	"compilerOptions": {
		"target": "es5",
		"module": "commonjs",
		"declaration": true,
		"outDir": "../${DIST}",
		"rootDir": "../${SRC}",
		"strict": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true
	},
	"include": [
		"../${SRC}"
	]
}
`;
	}
}

async function addPackageJson(
	appName: string,
	projectDependencies: IDependencies
): Promise<void> {
	return fsAsync.writeFile(
		path.join(
			DIST,
			PACKAGE_JSON
		),
		stringify(
			createPackageJson(
				appName,
				projectDependencies
			)
		)
	)
}

function createPackageJson(
	name: string,
	dependencies: IDependencies
): any {
	const allDependencies = mergeObjects(
		dependencies,
		DEFAULT_DEPENDENCIES
	);
	return {
		"name": name,
		"version": "1.0.0",
		"description": "",
		"main": "index.js",
		"bin": {
			[name]: "cli/index.js"
		},
		"dependencies": allDependencies
	};
}
