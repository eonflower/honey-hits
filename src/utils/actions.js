import {
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  SET_EXPIRES_AT,
  SET_CODE_VERIFIER,
  SET_ARTIST_DATA,
  SET_LIKED_DATA,
  SET_SONG_DATA,
  IS_LOGGED_IN,
  GET_USER_DATA,
} from "./Constants";

export const setAccessToken = (dispatch, accessToken) => {
  dispatch({ type: SET_ACCESS_TOKEN, accessToken: accessToken });
  // console.log("setAccessToken", accessToken);
};

export const setRefreshToken = (dispatch, refreshToken) => {
  dispatch({ type: SET_REFRESH_TOKEN, refreshToken: refreshToken });
  // console.log("setRefreshToken", refreshToken);
};

export const setExpiresAt = (dispatch, expiresAt) => {
  dispatch({ type: SET_EXPIRES_AT, expiresAt: expiresAt });
  console.log("setExpiresAt", expiresAt);
};

export const setCodeVerifier = (dispatch, codeVerifier) => {
  dispatch({ type: SET_CODE_VERIFIER, codeVerifier: codeVerifier });
  // console.log("setCodeVerifier", codeVerifier);
};

export const setArtistData = (dispatch, topArtists) => {
  dispatch({ type: SET_ARTIST_DATA, topArtists: topArtists });
  // console.log("setArtistData", topArtists);
};

export const setLikedData = (dispatch, recentlyLiked) => {
  dispatch({ type: SET_LIKED_DATA, recentlyLiked: recentlyLiked });
  // console.log("setLikedData", recentlyLiked);
};

export const setSongData = (dispatch, topSongs) => {
  dispatch({ type: SET_SONG_DATA, topSongs: topSongs });
  // console.log("setSongData", topSongs);
};

export const setIsLoggedIn = (dispatch, isLoggedIn) => {
  dispatch({ type: IS_LOGGED_IN, isLoggedIn: isLoggedIn });
  console.log("setIsLoggedIn", isLoggedIn);
};

export const setUserData = (dispatch, userData) => {
  dispatch({ type: GET_USER_DATA, userData: userData });
  // console.log("getUserData", userData);
};
