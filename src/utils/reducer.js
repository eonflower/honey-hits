import {
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  SET_EXPIRES_AT,
  SET_CODE_VERIFIER,
  SET_ARTIST_DATA,
  SET_LIKED_DATA,
  SET_SONG_DATA,
	IS_LOGGED_IN,
} from "./Constants";

export const initialState = {
  access_token: null,
  refresh_token: null,
  expires_at: null,
  code_verifier: null,
	isLoggedIn: false,
  topArtists: [],
  recentlyLiked: [],
  topSongs: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.refreshToken
      };
    case SET_EXPIRES_AT:
      return {
        ...state,
        expiresAt: action.expiresAt
      };
    case SET_CODE_VERIFIER:
      return {
        ...state,
        codeVerifier: action.codeVerifier
      };
    case SET_ARTIST_DATA:
      return {
        ...state,
        topArtists: action.topArtists
      };
    case SET_LIKED_DATA:
      return {
        ...state,
        recentlyLiked: action.recentlyLiked
      };
    case SET_SONG_DATA:
      return {
        ...state,
        topSongs: action.topSongs
      };
		case IS_LOGGED_IN:
			return {
				...state,
				isLoggedIn: action.isLoggedIn
			};
    default:
      return state;
  }
}

export default reducer;
