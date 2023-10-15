

export async function generateCodeChallenge(codeVerifier) {
	const digest = await crypto.subtle.digest(
		'SHA-256',
		new TextEncoder().encode(codeVerifier));

	function base64encode(str) {
		return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
		.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	}
	return base64encode(digest)
};