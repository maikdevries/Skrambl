export interface ErrorDetails {
	'message': Error['message'];
	'reason': string;
	'retriable': false | Temporal.Instant;
	'status_code': number;
	'type': Error['name'];
}

export class BaseError extends Error {
	#details: ErrorDetails;

	constructor(details: Omit<ErrorDetails, 'type'>) {
		super(details.message);
		this.name = this.constructor.name;

		this.#details = { ...details, 'type': this.name };
	}

	get details(): ErrorDetails {
		return this.#details;
	}
}
