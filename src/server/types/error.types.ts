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

type ServiceReason = 'external_request_error' | 'external_service_error';

export class ServiceError extends BaseError {
	static CODES = {
		'external_request_error': 500,
		'external_service_error': 502,
	} as const satisfies Record<ServiceReason, number>;

	static DESCRIPTIONS = {
		'external_request_error':
			'The server could not communicate with an external service while handling this request',
		'external_service_error': 'An external service encountered a problem while handling this request',
	} as const satisfies Record<ServiceReason, string>;

	constructor(reason: ServiceReason, duration?: Temporal.Duration) {
		super({
			'message': ServiceError.DESCRIPTIONS[reason],
			'reason': reason,
			'retriable': duration ? Temporal.Now.instant().add(duration) : false,
			'status_code': ServiceError.CODES[reason],
		});
	}
}
