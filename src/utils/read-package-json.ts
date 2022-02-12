import { Directory } from './directory';

export async function readPackageJson(rootDirPath: string): Promise<any> {
	const dir = new Directory(rootDirPath);
	// const filePath = dir.getPath('package.json');
	// const filePath = path.join(
	// 	rootDirPath,
	// 	'package.json'
	// );
	// const fileContent = await fsAsync.readFile(
	// 	filePath,
	// 	'utf-8'
	// );
	const fileContent = await dir.readFile('package.json');
	const parsed = JSON.parse(fileContent);
	return parsed;
}
