import { createContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import config from "./config";
import { generateRandomString } from "../auth/randomString";
import { generateCodeChallenge } from "../auth/codeChallenge";
import { generateUrlWithSearchParams } from "../auth/urlSearchParams";

export const StateContext = createContext();

// Initializing variables from localStorage or setting them to null if not present
let access_token = localStorage.getItem('access_token') || null;
let refresh_token = localStorage.getItem('refresh_token') || null;
let expires_at = localStorage.getItem('expires_at') || null;
let code = new URLSearchParams(window.location.search).get('code');
const currentTime = new Date().getTime(); // Current time in seconds

const tokenEvents = [
    "load",
    'click',
    'mousedown',
    'keypress',
]

// User authorization functions //

// Function to get access token from Spotify in exchange for the code
const exchangeForToken = () => {
    const code_verifier = localStorage.getItem('code_verifier');

    axios.post('https://accounts.spotify.com/api/token', 
        new URLSearchParams({
            client_id: config.CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: config.REDIRECT_URI,
            code_verifier,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        }
    )
    .then((response) => {
        return response.data;
    })
    .then((data) => {
        processTokenResponse(data);
        window.history.replaceState({}, document.title, '/');
    })
    .catch(addThrowErrorToFetch);
}

// Function to get refresh token from Spotify
const refreshToken = () => {
    axios.post('https://accounts.spotify.com/api/token',
        new URLSearchParams({
            client_id: config.CLIENT_ID,
            grant_type: 'refresh_token',
            refresh_token,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        }
    )
    .then((response) => {
        return response.data;
    })
    .then(processTokenResponse)
    .catch(addThrowErrorToFetch);
}

// Function to add error handling to fetch requests
async function addThrowErrorToFetch(response) {
    if (response.ok) {
        return response.data();
    } else {
        throw { response, error: await response.data() };
    }
}

// Function to redirect to Spotify's authorization endpoint
const redirectToSpotifyAuthorizeEndpoint = () => {
    const codeVerifier = generateRandomString(64);

    generateCodeChallenge(codeVerifier).then((code_challenge) => {
        let scope = config.AUTH_SCOPES.join(" ");
        window.localStorage.setItem('code_verifier', codeVerifier);

        window.location.href = generateUrlWithSearchParams(
            'https://accounts.spotify.com/authorize',
            {
                response_type: 'code',
                client_id: config.CLIENT_ID,
                scope,
                code_challenge_method: 'S256',
                code_challenge,
                redirect_uri: config.REDIRECT_URI,
            },
        ); 
    });
}

// Function to process token response from Spotify
const processTokenResponse = (data) => {
    // console.log(data);

    access_token = data.access_token;
    refresh_token = data.refresh_token;

    const t = new Date();
    expires_at = t.setSeconds(t.getSeconds() + data.expires_in);

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('expires_at', expires_at);

    // load data of logged in user
    getUserData();
    window.location.href = '/';
    <Navigate to='/' />
}

// Function to initiate user authentication
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

//  User Data Functions //

// Function to get user data from Spotify
const getUserData = () => {
    axios.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: 'Bearer ' + access_token,
        },
    })
    .then((response) => {
        return response.data;
    })
    .then((data) => {
        // console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
}


// Logout functions //

// Function to logout user
const logout = () => {
    localStorage.clear();
    window.location.reload();
    window.location.href = "/";
    <Navigate to='/login' />
}

// Component to provide state to child components
export const StateProvider = ({children}) => (
    <StateContext.Provider 
    value={{
        logout,
        getUserAuth,
        redirectToSpotifyAuthorizeEndpoint,
        exchangeForToken,
        refreshToken,
        getUserData,
        access_token,
        refresh_token,
        expires_at,
        code,
        currentTime,
        tokenEvents,

    }}>
        {children}
    </StateContext.Provider>
)
