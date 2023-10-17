import React, { useState, useEffect } from "react";
import {
    setAccessToken,
    setRefreshToken,
    setExpiresAt,
    setIsLoggedIn,
    setUserData,
  } from "../utils/actions"; // Import action creators
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import config from "../utils/config";
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";
import logoBig from "../assets/honey-big.png";
import login from "../components/backgrounds/login";


import {generateCodeChallenge} from '../auth/codeChallenge';
import {generateRandomString} from '../auth/randomString';
import {generateUrlWithSearchParams} from '../auth/urlSearchParams';



export default function Login(props) {
    const [{ accessToken, refreshToken, expiresAt, isLoggedIn, userData }, dispatch] = useStateProvider();
    const code_verifier = localStorage.getItem('code_verifier') || null;
    const access_token = localStorage.getItem('access_token') || null;
    const refresh_token = localStorage.getItem('refresh_token') || null;
    const expires_at = localStorage.getItem('expires_at') || null;

    let code = new URLSearchParams(window.location.search).get('code');
    
    const navigate = useNavigate();
    
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const background = login;
    document.body.style = background;

    const getUserData = (accessToken) => {
        console.log(accessToken)
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.data)
            .then((data) => {
                // console.log(data)
                setAccessToken(dispatch, access_token);
                setUserData(dispatch, data);

                // localStorage.setItem('isLoggedIn', true);
            })
            .catch(error => {
                throw new Error(`Error fetching user data: ${error.message}`);
            });
    };

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
    
    const processTokenResponse = (data) => {
        console.log(data)
        const access_token = data.access_token;
        const refresh_token = data.refresh_token;
        
        const t = new Date();
        const expires_at = t.setSeconds(t.getSeconds() + data.expires_in);
        
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('expires_at', expires_at);
        
        setAccessToken(dispatch, access_token);
        setRefreshToken(dispatch, refresh_token);
        setExpiresAt(dispatch, expires_at);
        setUserData(dispatch, data);

        getUserData(userData);
        window.location.href = '/';
    

    }

    const exchangeForToken = (codeVerifier) => {
        let codeInUrl = new URLSearchParams(window.location.search).get('code');
        axios.post('https://accounts.spotify.com/api/token', 
            new URLSearchParams({
                client_id: config.CLIENT_ID,
                grant_type: 'authorization_code',
                code: codeInUrl,
                redirect_uri: config.REDIRECT_URI,
                code_verifier: codeVerifier,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                }
            }
        )
        .then(response => response.data)
        .then((data) => {
            console.log(data)
            processTokenResponse(data);
            window.location.href = '/';
        })
        // .catch(error => {
        //     throw new Error(`Error exchanging token: ${error.message}`);
        // });
    }

    const handleClick = () => {
        redirectToSpotifyAuthorizeEndpoint();
            
    }


    useEffect(() => {
        if (code_verifier) {
            exchangeForToken(code_verifier);
            if (accessToken) {
                getUserData(accessToken);
            }
        }
    }, [handleClick]);

    return (
    <div className="login-wrapper">
        <img className="logo-big" src={logoBig} alt="honey hits logo" />
        <span className="button-span">
        <Button onClick={handleClick} className="login-button">
            Connect Spotify
        </Button>
        <a className="info-link" onClick={handleShow}>
            What's Honey Hits?
        </a>
        </span>
        <Modal className="modal"
        show={show}
        onHide={handleShow}
        centered
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0,}}
        >
        <Modal.Body>
            <div className='app-info'>
            <h2 className="info-q">What's the Buzz with Honey Hits?</h2>
            <p className="info-a">Honey Hits is your virtual beehive of musical wonders! 
            It's a Spotify-connected web app that gathers your top favorite artists, songs, 
            and the freshest jams you've just fallen in love with. Consider it your personal DJ bee! 🐝
            </p>
            <br />
            <h2 className="info-q">Do I Need My Own Spotify Account?</h2>
            <p className="info-a">Absolutely! To access Honey Hits, you'll need to login to a Spotify account. 
            We're like your backstage pass to your personalized music paradise!</p>
            <br />
            <h2 className="info-q">What About My Secret Music Garden?</h2>
            <p className="info-a">Don't worry, we're not planting any trackers in your musical soil! 
            Honey Hits does not have its own database, so none of your information gets stored anywhere except 
            your own device. It's all your own sweet, sweet Spotify data! 🌷</p>
            <a className="login-link" onClick={handleClose}>close the hive</a>
            </div>
        </Modal.Body>
        </Modal>
    </div>
    );
}

