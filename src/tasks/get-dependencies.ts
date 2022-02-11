import { IDependencies } from './i-dependencies';

const DEPENDENCIES = {
	"sade": "^1.8.1"
};
const DEV_DEPENDENCIES = {
	"@types/node": "^17.0.17",
	"@types/sade": "^1.7.4",
	"rimraf": "^3.0.2"
};

export function getDependencies(dependencies?: IDependencies): IDependencies {
	return mergeDependencies(
		dependencies,
		DEPENDENCIES
	) as IDependencies;
}

export function getDevDependencies(dependencies?: IDependencies): IDependencies {
	return mergeDependencies(
		dependencies,
		DEV_DEPENDENCIES
	) as IDependencies;
}

function mergeDependencies(
	value1: unknown | undefined,
	value2: unknown
) {
	return Object.assign(
		value1 ?? {},
		value2
	);
}
