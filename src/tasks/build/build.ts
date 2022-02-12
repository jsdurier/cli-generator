
import fs from 'fs-extra';
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

import { APP_DIRNAME } from './app-dirname';
import { createMain } from './create-main';
import { IAppInfo } from './i-app-info';

const CONFIG = '.config';
const DIST = 'dist';
const SRC = 'src';
const PACKAGE_JSON = 'package.json';

export async function build(): Promise<void> {
	const rootPackageJson = await readPackageJson('');
	const appName = rootPackageJson.name;
	const tree = new Tree(
		'',
		rootPackageJson
	);
	await tree.create();
	await addSourceCode(rootPackageJson);
	await runBuildCommand();
	await addPackageJson(
		appName,
		rootPackageJson.dependencies
	);
}

async function addSourceCode(
	appInfo: IAppInfo
): Promise<void> {
	fsAsync.mkdir(
		path.join(
			CONFIG,
			'src'
		)
	);
	fs.copySync(
		'src',
		path.join(
			CONFIG,
			'src',
			APP_DIRNAME
		)
	);
	fsAsync.writeFile(
		path.join(
			CONFIG,
			'src',
			'index.ts'
		),
		createMain(appInfo)
	)
}

function runBuildCommand(): Promise<void> {
	return runCommand(`cd ${CONFIG} && pnpx tsc`);
}

class Tree extends AbstractFolderTreeCreator<IAppInfo> {
	protected getTreeConfiguration(): IFilesTree<IAppInfo> {
		return {
			[CONFIG]: {
				'tsconfig.json': getTsConfig,
				// 'index.ts': () => this.getIndex()
			}
		};
	}

	// private getIndex(): string {
	// 	return generateMain(
	// 		this._arg.name,
	// 		this._arg.version
	// 	);
	// }
}

function getTsConfig(): string {
	return `{
	"compilerOptions": {
		"target": "es5",
		"module": "commonjs",
		"declaration": true,
		"outDir": "../${DIST}",
		"rootDir": "./src",
		"strict": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true
	}
}
`;
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
			[name]: "index.js"
		},
		"dependencies": allDependencies
	};
}
