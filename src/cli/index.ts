#!/usr/bin/env node
import sade from 'sade';

import {
	build,
	generate,
	installDependencies
} from '../tasks';

const prog = sade('my-cli');

prog
	.version('1.0.5')
// .option(
// 	'--global, -g',
// 	'An example global flag'
// )
// .option(
// 	'-c, --config',
// 	'Provide path to custom config',
// 	'foo.config.js'
// );

prog
	.command('generate <name>')
	.describe('Build the source directory. Expects an `index.js` entry file.')
	// .option(
	// 	'-o, --output',
	// 	'Change the name of the output file',
	// 	'bundle.js'
	// )
	// .example('build src build --global --config my-conf.js')
	// .example('build app public -o main.js')
	.action((
		name,
		opts
	) => {
		generate(name);
	});

prog
	.command('install')
	.action((
		opts
	) => {
		installDependencies()
	});

prog
	.command('build')
	.action((
		opts
	) => {
		build()
	});

prog.parse(process.argv);
