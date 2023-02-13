import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
    topArtists: [],
    topSongs: [],
    likedSongs: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN : {
            return {
                ...state, 
                token: action.token,
            }
        }
        case reducerCases.SET_TOP_ARTISTS : {
            return {
                ...state, 
                topArtists: action.topArtists,
            }
        }
        case reducerCases.SET_TOP_SONGS : {
            return {
                ...state, 
                topSongs: action.topSongs,
            }
        }
        case reducerCases.SET_TOP_LIKED : {
            return {
                ...state, 
                likedSongs: action.likedSongs,
            }
        }
        default:
            return state;
    }
};


export default reducer;