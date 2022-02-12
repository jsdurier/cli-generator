// const tree: IFilesTree<void> = {
// 	'.config': {
// 		'tsconfig.json': getTsconfig
// 	}
// };

export async function build(): Promise<void> {
	// TODO
	// const rootPackageJson = await readPackageJson('');
	// const appName = rootPackageJson.name;
	// await writeTree(
	// 	'',
	// 	tree,
	// 	undefined
	// );
	// await runCommand(`cd .config && pnpx tsc`);
	// await addPackageJson(
	// 	appName,
	// 	rootPackageJson.dependencies
	// );
}

// function getTsconfig(): string {
// 	return `{
// 	"compilerOptions": {
// 		"target": "es5",
// 		"module": "commonjs",
// 		"declaration": true,
// 		"outDir": "../dist",
// 		"rootDir": "../src",
// 		"strict": true,
// 		"esModuleInterop": true,
// 		"forceConsistentCasingInFileNames": true
// 	},
// 	"include": [
// 		"../src"
// 	]
// }
// `;
// }

// async function addPackageJson(
// 	appName: string,
// 	dependencies: IDependencies
// ): Promise<void> {
// 	return fsAsync.writeFile(
// 		path.join(
// 			'dist',
// 			'package.json'
// 		),
// 		getPackageJson(
// 			appName,
// 			dependencies
// 		)
// 	)
// }

// function getPackageJson(
// 	name: string,
// 	dependencies: IDependencies
// ): string {
// 	const res = {
// 		"name": name,
// 		"version": "1.0.0",
// 		"description": "",
// 		"main": "index.js",
// 		"bin": {
// 			[name]: "cli/index.js"
// 		},
// 		"dependencies": getDependencies(dependencies)
// 	};
// 	return JSON.stringify(
// 		res,
// 		null,
// 		2
// 	);
// }
