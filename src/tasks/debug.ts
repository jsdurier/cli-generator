import { runCommand } from '../utils/run-command';

const ENTRY_FILE = 'src/cli/index.ts';
const RUNNER = 'pnpx ts-node';

export async function debug(options: any): Promise<void> {
	const stringOptions = getStringOptions(options);
	await runCommand(`${RUNNER} ${ENTRY_FILE} ${stringOptions}`);
}

function getStringOptions(options: any): string {
	const args = [
		...options['_'],
		...Object
			.keys(options)
			.filter(e => e !== '_')
			.map(e => `--${e} ${options[e]}`)
	];
	return args.join(' ');
}
