const config = {
    CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
    CLIENT_SECRET: import.meta.env.VITE_CLIENT_SECRET,

    AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN,
    AUTH_CLIENT_ID: import.meta.env.VITE_AUTH_CLIENT_ID,
    AUTH_CLIENT_SECRET: import.meta.env.VITE_AUTH_CLIENT_SECRET,

    API_URI: "https://api.spotify.com/v1",
    AUTH_URI: "https://accounts.spotify.com/authorize",
    TOKEN_URI: "https://accounts.spotify.com/api/token",
    AUTH_SCOPES: [
        'user-read-recently-played', 
        'user-top-read', 
        'playlist-modify-public',
        'user-library-read',
    ],
    // REDIRECT_URI: "http://localhost:5173/", // for local dev
    
    REDIRECT_URI:"https://honeyhits.club", // for prod
    
    
};


export default config;
