import path from 'path';

import { fsAsync } from './fs-async';

export class Directory {
	constructor(private readonly _rootDirPath: string) { }

	getPath(...fileNames: string[]): string {
		return path.join(
			this._rootDirPath,
			...fileNames
		);
	}

	readFile(...fileNames: string[]): Promise<string> {
		return fsAsync.readFile(
			this.getPath(...fileNames),
			'utf-8'
		)
	}
}
