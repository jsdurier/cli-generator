import path from "path";
import { fsAsync } from "../utils/fs-async";
import { install } from "./install";

/**
 * Install dependencies in package.json at root
 */
export async function installFromPackageJson(rootDirPath: string): Promise<void> {
	const packageJsonContent = await readPackageJson(rootDirPath);
	const dependencies = {
		dependencies: packageJsonContent.dependencies,
		devDependencies: packageJsonContent.devDependencies
	};
	return install(
		rootDirPath,
		dependencies
	);
}

async function readPackageJson(rootDirPath: string): Promise<any> {
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
