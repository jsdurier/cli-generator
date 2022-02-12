import path from 'path';

import { fsAsync } from './fs-async';

export class Directory {
	constructor(private readonly _rootDirPath: string) { }

	readFile(fileName: string): Promise<string> {
		return fsAsync.readFile(
			this.getPath(fileName),
			'utf-8'
		);
	}

	getPath(...fileNames: string[]): string {
		return path.join(
			this._rootDirPath,
			...fileNames
		);
	}
}
