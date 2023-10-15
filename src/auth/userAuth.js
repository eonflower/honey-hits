import { AUTH_URL, CLIENT_ID, REDIRECT_URI, AUTH_SCOPES } from "./constants.js";
import generateRandomString from './randomString.js'
import generateCodeChallenge from './codeChallenge'

let randomString = generateRandomString(128)

generateCodeChallenge(randomString)
	.then((codeChallenge) => {
		let state = generateRandomString(16);
		let scope = AUTH_SCOPES.join(" ");

		localStorage.setItem("code_verifier", randomString);

		let args = new URLSearchParams({
			response_type: "code",
			client_id: CLIENT_ID,
			scope,
			redirect_uri: REDIRECT_URI,
			code_challenge_method: "S256",
			code_challenge: codeChallenge,
			state,
		});

		window.location = `${AUTH_URL}?${args.toString()}`;
	});


	const params = new URLSearchParams(window.location.search);
	let code = params.get("code");
	
	let codeVerifier = localStorage.getItem("code_verifier");
	
	let body = new URLSearchParams({
		grant_type: "authorization_code",
		code,
		redirect_uri: REDIRECT_URI,
		code_verifier: codeVerifier,
	});
	