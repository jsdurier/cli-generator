import path from 'path';

import { fsAsync } from '../utils/fs-async';

export async function readPackageJson(rootDirPath: string): Promise<any> {
	const filePath = path.join(
		rootDirPath,
		'package.json'
	);
	const fileContent = await fsAsync.readFile(
		filePath,
		'utf-8'
	);
	const parsed = JSON.parse(fileContent);
	return parsed;
}
