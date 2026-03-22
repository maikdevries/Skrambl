interface Snippet {
	'message': Error['message'];
	'reason': string;
	'retriable': false | Temporal.Instant;
	'status_code': number;
	'type': Error['name'];
}

export class BaseError extends Error {
	#snippet: Snippet;

	constructor(snippet: Omit<Snippet, 'type'>) {
		super(snippet.message);
		this.name = this.constructor.name;

		this.#snippet = { ...snippet, 'type': this.name };
	}

	get snippet(): Snippet {
		return this.#snippet;
	}
}
