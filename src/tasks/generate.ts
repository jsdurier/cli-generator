import { fsAsync } from '../utils/fs-async';
import { IFilesTree } from '../utils/install-dependencies/files-tree';
import { AbstractFolderTreeCreator } from '../utils/install-dependencies/folder-tree-creator';

import { firstInstall } from './first-install';

const CLI_NAME = 'cli-generator';
const VERSION = '1.0.0';

export async function generate(cliName: string): Promise<void> {
	await fsAsync.mkdir(cliName);
	const rootDirPath = getDirName(cliName);
	const tree = new Tree(
		rootDirPath,
		cliName
	);
	await tree.create();
	await firstInstall(rootDirPath);
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

## Build

\`\`\`
${CLI_NAME} build
\`\`\`

## Debug

\`\`\`
${CLI_NAME} debug -- [args]
\`\`\`
`;
	}

	private getIndex(): string {
		return `#!/usr/bin/env node
import sade from 'sade';

const NAME = '${this._arg}';
const VERSION = '${VERSION}';

sade(NAME)
	.version(VERSION)
	.command('example')
	.describe('Example command')
	.action(opts => {
		console.log('run example');
	})
	.parse(process.argv);
`;
	}
}

/**
 * TODO check user input (-, Az, ...)
 */
function getDirName(cliName: string): string {
	return cliName;
}
