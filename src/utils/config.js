const config = {
    CLIENT_ID: "1ec94dff818a4e49a79f3b5c48cf5fa7",
    CLIENT_SECRET: "9f9a1048eb39488e81a45e191509cd02",
    API_URL: "https://api.spotify.com/v1",
    AUTH_URL: "https://accounts.spotify.com/authorize",
    AUTH_SCOPES: [
        'user-read-recently-played', 
        "user-top-read", 
        "playlist-modify-public", 
        "user-modify-playback-state",
        "user-read-email", 
        "user-read-private"
    ],
    CALLBACK_URL: `http://localhost:5173/`
}

export default config;