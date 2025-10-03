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

	constructor(code: number, method: string, url: string) {
		super(`Request failed with code ${code}. URL: ${method} ${url}`);

		this.#code = code;
		this.name = this.constructor.name;
	}

	get code(): number {
		return this.#code;
	}
}

export interface User {
	'id': string;
	'image': {
		'size': number;
		'url': string;
	};
	'name': string;
}
