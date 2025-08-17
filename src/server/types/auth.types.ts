export interface AuthorisationResponse {
	'access_token': string;
	'expires_in': number;
	'refresh_token': string | undefined;
	'scope': string;
	'token_type': 'Bearer';
}

export interface PKCE {
	'state': string;
	'verifier': string;
}
