import env from "../../env"

const config = {
    CLIENT_ID: env.CLIENT_ID,
    API_URL: "https://api.spotify.com/v1",
    AUTH_URL: "https://accounts.spotify.com/authorize",
    AUTH_SCOPES: [
        'user-read-recently-played', 
        "user-top-read", 
        "playlist-modify-public",
        "user-library-read",
    ],
    // CALLBACK_URL: `http://localhost:5173/`
    CALLBACK_URL: `https://honey-hits.netlify.app`
}

export default config;