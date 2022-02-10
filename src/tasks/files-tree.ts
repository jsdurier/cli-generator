import { promises as fsAsync } from 'fs';
import path from 'path';

export interface IFilesTree<T> {
	[fileName: string]: ((arg: T) => string) | IFilesTree<T> | string;
}

export async function writeTree<T>(
	rootDirPath: string,
	filesTree: IFilesTree<T>,
	arg: T
): Promise<void> {
	for (const fileName of Object.keys(filesTree)) {
		const value = filesTree[fileName];
		const filePath = path.join(
			rootDirPath,
			fileName
		);
		if (typeof value === 'object') {
			await fsAsync.mkdir(filePath);
			await writeTree(
				filePath,
				value,
				arg
			);
		} else if (typeof value === 'function') {
			const fileContent = value(arg);
			await fsAsync.writeFile(
				filePath,
				fileContent
			);
		} else if (typeof value === 'string') {
			await fsAsync.writeFile(
				filePath,
				value
			);
		}
	}
}
