import child_process from 'child_process';

export function runCommand(command: string): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		child_process.exec(
			command,
			(
				error,
				stdout,
				stderr
			) => {
				if (error) {
					// console.log(`error: ${error.message}`);
					reject(error);
					return;
				}
				if (stderr) {
					// console.log(`stderr: ${stderr}`);
					return;
				}
				// console.log(`stdout: ${stdout}`);
				resolve();
			}
		);
	});
}
