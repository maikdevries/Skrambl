export interface PKCE {
	'state': string;
	'verifier': string;
}

export interface TokenResponse {
	'access_token': string;
	'token_type': 'Bearer';
	'scope': string;
	'expires_in': number;
	'refresh_token': string | undefined;
}
