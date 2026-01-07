export interface Cache {
	'playlists': Promise<Playlist[]>;
	'tracks': Map<Playlist['id'], Track[]>;
	'user': User;
}

export interface Credentials {
	'expires': number;
	'refresh': string;
	'token': string;
}

export interface Playlist {
	'id': string;
	'description': string;
	'image': {
		'size': number;
		'url': string;
	};
	'name': string;
	'supported': boolean;
	'url': string;
}

export class ServerError extends Error {
	#code: number;

	static DESCRIPTIONS: { [code: number]: string } = {
		400: 'The request or its payload is malformed',
		401: 'The authorisation for this request is missing or has expired',
		403: 'The authorisation for this request denies access to the requested resource',
		404: 'The requested resource could not be found',
		502: 'The server located upstream encountered a problem while handling this request',
		503: 'The server located upstream is currently unavailable',
	};

	constructor(code: number, method: string, url: string) {
		super(`Request failed with code ${code}. URL: ${method} ${url}`);

		this.#code = code;
		this.name = this.constructor.name;
	}

	get code(): number {
		return this.#code;
	}
}

export interface Track {
	'uri': string;
}

export interface User {
	'id': string;
	'image': {
		'size': number;
		'url': string;
	};
	'name': string;
}
