function getTsconfig(): string {
	return `{
	"compilerOptions": {
		"target": "es5",
		"module": "commonjs",
		"declaration": true,
		"outDir": "../dist",
		"rootDir": "../src",
		"strict": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true
	},
	"include": [
		"../src"
	]
}
`;
}
