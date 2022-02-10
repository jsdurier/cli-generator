import { promises as fsAsync } from 'fs';
import path from 'path';

import { runCommand } from '../utils/run-command';

import {
	IFilesTree,
	writeTree
} from './files-tree';
import { install } from './install';


/**
 * First installation of dependencies
 */
export async function firstInstall(rootDir: string): Promise<void> {
	return install(rootDir);
}
