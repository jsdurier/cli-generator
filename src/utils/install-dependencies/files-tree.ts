export interface IFilesTree<T> {
	[fileName: string]: ((
		rootDir: string,
		arg: T
	) => string | Promise<string>) | IFilesTree<T> | string;
}
