
import path from 'path';

import { fsAsync } from '../fs-async';

export interface IFilesTree<T> {
	[fileName: string]: ((
		rootDir: string,
		arg: T
	) => string) | IFilesTree<T> | string;
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
			await createFolderIfNotExist(filePath);
			await writeTree(
				filePath,
				value,
				arg
			);
		} else if (typeof value === 'function') {
			const fileContent = value(
				rootDirPath,
				arg
			);
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

async function createFolderIfNotExist(folderPath: string): Promise<void> {
	try {
		await fsAsync.mkdir(folderPath);
	} catch (err) { }
}
