import { createContext, useContext} from "react";
import axios from "axios";
import config from "./config";
import {generateRandomString} from "../auth/randomString";
import {generateCodeChallenge} from "../auth/codeChallenge";
import {generateUrlWithSearchParams} from "../auth/urlSearchParams";

export const StateContext = createContext();

    // Restore tokens from localStorage
    let access_token = localStorage.getItem('access_token') || null;
    let refresh_token = localStorage.getItem('refresh_token') || null;
    let expires_at = localStorage.getItem('expires_at') || null;

    const mainPlaceholder = document.getElementById('main');
    const oauthPlaceholder = document.getElementById('oauth');
    const errorPlaceholder = document.getElementById('error');


    const code = new URLSearchParams(window.location.search).get('code');
    

    const getAccessToken = () => {
        const code_verifier = localStorage.getItem('code_verifier');

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams({
                client_id: config.CLIENT_ID,
                grant_type: 'authorization_code',
                code,
                redirect_uri: config.REDIRECT_URI,
                code_verifier,
            }),
            })
            .then(addThrowErrorToFetch)
            .then((data) => {
                processTokenResponse(data);

                // clear search query params in the url
                window.history.replaceState({}, document.title, '/');
            })
            .catch(handleError);
    }
    const refreshToken = () => {
        fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({
            client_id,
            grant_type: 'refresh_token',
            refresh_token,
        }),
        })
        .then(addThrowErrorToFetch)
        .then(processTokenResponse)
        .catch(handleError);
    }

    function handleError(error) {
        console.error(error);
        mainPlaceholder.innerHTML = errorTemplate({
            status: error.response.status,
            message: error.error.error_description,
            });
        }
        
    async function addThrowErrorToFetch(response) {
        if (response.ok) {
        return response.json();
        } else {
        throw { response, error: await response.json() };
        }
    }

    function redirectToSpotifyAuthorizeEndpoint() {
        const codeVerifier = generateRandomString(64);
    
        generateCodeChallenge(codeVerifier).then((code_challenge) => {
            window.localStorage.setItem('code_verifier', codeVerifier);
        
            window.location.href = generateUrlWithSearchParams(
                'https://accounts.spotify.com/authorize',
                {
                response_type: 'code',
                client_id: config.CLIENT_ID,
                scope: 'user-read-private user-read-email',
                code_challenge_method: 'S256',
                code_challenge,
                redirect_uri: config.REDIRECT_URI,
                },
            );
    
            });
        }

        const processTokenResponse = (data) => {
            console.log(data);

            access_token = data.access_token;
            refresh_token = data.refresh_token;

            const t = new Date();
            expires_at = t.setSeconds(t.getSeconds() + data.expires_in);

            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('expires_at', expires_at);

            oauthPlaceholder.innerHTML = oAuthTemplate({
            access_token,
            refresh_token,
            expires_at,
            });

            // load data of logged in user
            getUserData();
        }
        
        const getUserData = () => {
            fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + access_token,
            },
            })
            .then(async (response) => {
                if (response.ok) {
                return response.json();
                } else {
                throw await response.json();
                }
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
        }

    const getUserAuth = () => {
        let randomString = generateRandomString(128)

        generateCodeChallenge(randomString)
            .then((codeChallenge) => {
                let state = generateRandomString(16);
                let scope = config.AUTH_SCOPES.join(" ");

                localStorage.setItem("code_verifier", randomString);

                let args = new URLSearchParams({
                    response_type: "code",
                    client_id: config.CLIENT_ID,
                    scope,
                    redirect_uri: config.REDIRECT_URI,
                    code_challenge_method: "S256",
                    code_challenge: codeChallenge,
                    state,
                });

                window.location = `${config.AUTH_URI}?${args}`;
            });
    }

    const getLikedData = (token) => {
        const response = axios.get(`${config.API_URI}/me/tracks?limit=50&offset=0`, {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
        })
            .then(response => {
            const { items } = response.data;
            return items.map(({ track, duration_ms, uri, name, id, artists, album }) => {
                return { track, duration_ms, uri, name, id, artists, album };
            });
            });
            
        };

    const getArtistData = (token, timeFrame) => {
        const response = axios.get(
            `${config.API_URI}/me/top/artists?time_range=${timeFrame}&limit=50&offset=0`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
            }
        )
        .then(response => {
            const { items } = response.data;
            return items.map(({ name, uri, id, genres, images }) => {
                return { name, uri, id, genres, images };
            });
        });
    };

    const getSongData = (token, timeFrame) => {
        const response = axios.get(
            `${config.API_URI}/me/top/tracks?time_range=${timeFrame}&limit=50&offset=0`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
            })
            .then(response => {
                const { items } = response.data;
                return items.map(({ name, duration_ms, uri, id, artists, album }) => {
                    return { name, duration_ms, uri, id, artists, album };
                });
                });
            };

export const StateProvider = ({children}) => (
    <StateContext.Provider 
    value={{
        getUserAuth,
        redirectToSpotifyAuthorizeEndpoint,
        getAccessToken,
        refreshToken,
        getUserData,
        getLikedData,
        getArtistData,
        getSongData,
        access_token,
        refresh_token,
        expires_at,
        code,

    }}>
        {children}
    </StateContext.Provider>
)

export const useStateProvider = () => useContext(StateContext)