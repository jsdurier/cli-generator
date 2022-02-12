import { Directory } from '../directory';
import { fsAsync } from '../fs-async';

import { IFilesTree } from './files-tree';

export abstract class AbstractFolderTreeCreator<T> {

	constructor(
		private readonly _rootDirPath: string,
		protected readonly _arg: T
	) { }

	protected abstract getTreeConfiguration(): IFilesTree<T>;

	create(): Promise<void> {
		const filesTree = this.getTreeConfiguration();
		return this.createSubFolder(
			this._rootDirPath,
			filesTree
		);
	}

	private async createSubFolder(
		rootDirPath: string,
		filesTree: IFilesTree<T>
	): Promise<void> {
		const dir = new Directory(rootDirPath);
		for (const fileName of Object.keys(filesTree)) {
			const value = filesTree[fileName];
			const filePath = dir.getPath(fileName);
			if (typeof value === 'object') {
				await createFolderIfNotExist(filePath);
				await this.createSubFolder(
					filePath,
					value
				);
			} else if (typeof value === 'function') {
				const fileContent = value(
					rootDirPath,
					this._arg
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
}

async function createFolderIfNotExist(folderPath: string): Promise<void> {
	try {
		await fsAsync.mkdir(folderPath);
	} catch (err) { }
}
