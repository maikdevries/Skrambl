export interface Credentials {
	'token': string;
	'expires': number;
	'refresh': string;
}

export const HTTP_METHOD = {
	'DELETE': 'DELETE',
	'GET': 'GET',
	'POST': 'POST',
} as const;

export type JSON = string | number | boolean | null | JSON[] | {
	[key: string]: JSON;
};

export interface Page<T> {
	'href': string;
	'items': T[];
	'limit': number;
	'next': string | null;
	'offset': number;
	'previous': string | null;
	'total': number;
}
