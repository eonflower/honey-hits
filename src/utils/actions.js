// actions.js
import { reducerCases } from './Constants';
import config  from './config';
import generateRandomString from '../auth/randomString';
import { generateCodeChallenge }from '../auth/codeChallenge';

export const setUserAuth = (code) => ({
  type: reducerCases.SET_USER_AUTH,
  code,
});

export const initiateUserAuth = () => {
  return (dispatch) => {
    let randomString = generateRandomString(128);

    generateCodeChallenge(randomString)
      .then((codeChallenge) => {
        let state = generateRandomString(16);

        localStorage.setItem('code_verifier', randomString);

        let args = new URLSearchParams({
          response_type: 'code',
          client_id: config.CLIENT_ID,
          scope: config.AUTH_SCOPES.join(' '),
          redirect_uri: config.REDIRECT_URI,
          code_challenge_method: 'S256',
          code_challenge: codeChallenge,
          state,
        });

        window.location = `${config.AUTH_URL}?${args.toString()}`;
      });
  };
};

