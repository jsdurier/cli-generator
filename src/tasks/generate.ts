import { fsAsync } from '../utils/fs-async';

import {
	IFilesTree,
	writeTree
} from './files-tree';
import { firstInstall } from './first-install';

const CLI_NAME = 'cli-generator';

const tree: IFilesTree<string> = {
	'package.json': getPackageJson,
	'README.md': getReadme,
	'.gitignore': '.config',
	'src': {
		'cli': {
			'index.ts': getIndex
		}
	}
};

export async function generate(cliName: string): Promise<void> {
	await fsAsync.mkdir(cliName);
	writeTree(
		cliName,
		tree,
		cliName
	);
	await firstInstall(cliName);
}

const VERSION = '1.0.0';

function getPackageJson(
	name: string
): string {
	return `{
	"name": "${name}",
	"version": "${VERSION}",
	"description": "",
	"dependencies": {
		"rxjs": "^7.5.4"
	}
}
`;
}

function getReadme(name: string): string {
	return `# ${name}

## Install

\`\`\`
${CLI_NAME} install
\`\`\`
`;
}

function getIndex(): string {
	return 'console.log(\'hello world\');';
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
