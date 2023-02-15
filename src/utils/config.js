const config = {
    CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
    CLIENT_SECRET: import.meta.env.VITE_CLIENT_SECRET,
    API_URL: "https://api.spotify.com/v1",
    AUTH_URL: "https://accounts.spotify.com/authorize",
    AUTH_SCOPES: [
        'user-read-recently-played', 
        "user-top-read", 
        "playlist-modify-public",
        "user-library-read",
    ],
    CALLBACK_URL: `https://honey-hits.netlify.app`,
    // CALLBACK_URL: `http://localhost:5173/`,
}

export default config;
