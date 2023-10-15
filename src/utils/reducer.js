// reducer.js

import { createSlice } from '@reduxjs/toolkit';
import config from './config';
import { reducerCases } from './Constants';

export const initialState = {
    token: null,
    topArtists: [],
    topSongs: [],
    likedSongs: [],
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setToken(state, action) {
        state.token = action.payload;
        },
        setTopLiked(state, action) {
        state.likedSongs = action.payload;
        },
        setTopArtists(state, action) {
        state.topArtists = action.payload;
        },
        setTopSongs(state, action) {
        state.topSongs = action.payload;
        },
        setUserAuth(state, action) {
        const codeVerifier = localStorage.getItem('code_verifier');
        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: action.payload, // Assuming payload contains the code
            redirect_uri: config.REDIRECT_URI,
            code_verifier: codeVerifier,
            });
    
            fetch(config.TOKEN_URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`)}`,
            },
            body: body.toString(),
            })
            .then(res => {
                if (!res.ok) {
                throw new Error(`Error with status code: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (data.access_token) {
                state.token = data.access_token;
                }
            })
            .catch(err => {
                console.error('Error: ', err);
            });
        }
    },
});

export const { setToken, setTopLiked, setTopArtists, setTopSongs, setUserAuth } = appSlice.actions;
export default appSlice.reducer;



// import { reducerCases } from './Constants';
// import config from './config';

// export const initialState = {
//     token: null,
//     topArtists: [],
//     topSongs: [],
//     likedSongs: [],
    
// };

// export const reducer = (state, action) => {
//     switch (action.type) {
//     case reducerCases.SET_TOKEN:
//         return {
//         ...state,
//         token: action.token
//         };
//     case reducerCases.SET_TOP_LIKED:
//         return {
//         ...state,
//         likedSongs: action.likedSongs
//         };
//     case reducerCases.SET_TOP_ARTISTS:
//         return {
//         ...state,
//         topArtists: action.topArtists
//         };
//     case reducerCases.SET_TOP_SONGS:
//         return {
//         ...state,
//         topSongs: action.topSongs
//         };
//     case reducerCases.SET_USER_AUTH:
//         let codeVerifier = localStorage.getItem('code_verifier');
    
//         let body = new URLSearchParams({
//             grant_type: 'authorization_code',
//             code: action.code, // This is the code from the user auth process
//             redirect_uri: config.REDIRECT_URI,
//             code_verifier: codeVerifier,
//         });
        
//         fetch(config.TOKEN_URI, {
//             method: 'POST',
//             headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             Authorization: `Basic ${btoa(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`)}`,
//             },
//             body: body.toString(),
//         })
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error(`Error with status code: ${res.status}`);
//             }
//         return res.json();
//         })
//         .then(data => {
//             if (data.access_token) {
//                 return {
//                     ...state,
//                     token: data.access_token,
//                 };
//             }
//             return state; // Return the current state if authentication failed
//         })
//         .catch(err => {
//             console.error('Error: ', err);
//             return state; // Return the current state in case of an error
//         });
//     }
// };

// export default reducer;


