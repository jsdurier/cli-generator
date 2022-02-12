import { fsAsync } from '../utils/fs-async';
import { IFilesTree } from '../utils/install-dependencies/files-tree';
import { AbstractFolderTreeCreator } from '../utils/install-dependencies/folder-tree-creator';

import { firstInstall } from './first-install';

const CLI_NAME = 'cli-generator';
const VERSION = '1.0.0';

export async function generate(cliName: string): Promise<void> {
	await fsAsync.mkdir(cliName);
	const tree = new Tree(
		cliName,
		cliName
	);
	await tree.create();
	await firstInstall();
}

class Tree extends AbstractFolderTreeCreator<string> {
	protected getTreeConfiguration(): IFilesTree<string> {
		return {
			'package.json': () => this.createPackageJson(),
			'README.md': () => this.getReadme(),
			'.gitignore': '.config',
			'src': {
				'cli': {
					'index.ts': () => this.getIndex()
				}
			}
		};
	}

	private createPackageJson(): string {
		return `{
	"name": "${this._arg}",
	"version": "${VERSION}",
	"description": "",
	"dependencies": {
		"rxjs": "^7.5.4"
	}
}
`;
	}

	private getReadme(): string {
		return `# ${this._arg}
	
	## Install
	
	\`\`\`
	${CLI_NAME} install
	\`\`\`
	`;
	}

	private getIndex(): string {
		return 'console.log(\'hello world\');';
	}
}

// function getPackageJsonFileContent(
// 	name: string
// ) {
// 	return `{
//   "name": "${name}",
//   "version": "${VERSION}",
//   "description": "",
//   "main": "dist/index.js",
//   "bin": {
//     "${name}": "dist/cli/index.js"
//   },
//   "scripts": {
//     "build": "npm run clean && tsc && chmod +x dist/cli/index.js",
//     "clean": "rimraf dist",
// 		"debug": "dist/cli/index.js",
// 		"build-debug": "pnpm build && pnpm debug"
//   },
//   "author": "",
//   "license": "ISC",
//   "devDependencies": {
//     "@types/node": "^17.0.17",
//     "@types/sade": "^1.7.4",
//     "rimraf": "^3.0.2"
//   },
//   "dependencies": {
//     "sade": "^1.8.1"
//   }
// }
// `
// };
