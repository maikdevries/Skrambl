import { OPERATIONS } from '../controllers/api.controllers.ts';

type Validator<T> = {
	[K in keyof T]: (value: unknown) => boolean;
};

// [TODO] Change validation approach to semantic parsing of dirty input into clean data structures
function validate<T>(validators: Validator<T>): (value: unknown) => value is T {
	return ((value: unknown): value is T => {
		if (typeof value !== 'object' || value === null) return false;

		return Object.keys(validators).every((key) => {
			return validators[key as keyof T]((value as Record<string, unknown>)[key]);
		});
	});
}

export const operation = validate<{ 'operation': keyof typeof OPERATIONS; 'items': string[] }>({
	'operation': (value) => typeof value === 'string' && value in OPERATIONS,
	'items': (value) => Array.isArray(value) && value.every((x) => typeof x === 'string'),
});
