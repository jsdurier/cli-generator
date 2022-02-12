export function mergeObjects(
	value1: unknown,
	value2: unknown
) {
	return Object.assign(
		{},
		value1,
		value2
	);
}
