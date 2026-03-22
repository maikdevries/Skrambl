import { BaseError } from '@self/common/types';

type RouteReason = 'authorisation_expired' | 'authorisation_missing' | 'resource_not_found';

export class RouteError extends BaseError {
	static CODES = {
		'authorisation_expired': 401,
		'authorisation_missing': 401,
		'resource_not_found': 404,
	} as const satisfies Record<RouteReason, number>;

	static DESCRIPTIONS = {
		'authorisation_expired': 'The authorisation for this request has expired',
		'authorisation_missing': 'The authorisation for this request is missing',
		'resource_not_found': 'The requested resource could not be found',
	} as const satisfies Record<RouteReason, string>;

	constructor(reason: RouteReason, duration?: Temporal.Duration) {
		super({
			'message': RouteError.DESCRIPTIONS[reason],
			'reason': reason,
			'retriable': duration ? Temporal.Now.instant().add(duration) : false,
			'status_code': RouteError.CODES[reason],
		});
	}
}
