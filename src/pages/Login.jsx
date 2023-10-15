import React, { useState, useContext, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import logoBig from "../assets/honey-big.png";
import login from "../components/backgrounds/login";
import { StateContext } from "../utils/StateProvider";


export default function Login(props) {
    const { redirectToSpotifyAuthorizeEndpoint, exchangeForToken, access_token } = useContext(StateContext);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const background = login;
    document.body.style = background;


    const handleClick = () => {
        // Redirect to Spotify authorization
        redirectToSpotifyAuthorizeEndpoint();
    }

    useEffect(() => {
        // Check if we have received the code from Spotify
        const args = new URLSearchParams(window.location.search);
        const code = args.get('code');
        if (code) {
            // we have received the code from Spotify and will exchange it for an access_token
            exchangeForToken(code);
        }
    }, [handleClick]); // runs when handleClick is called


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
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
        <Modal.Body>
            <div className='app-info'>
            <h2 className="info-q">What's Honey Hits?</h2>
            <p className="info-a">Honey Hits is a Spotify-connected web app that allows you to see all your top favourite artists, songs, and most recently liked songs in one place. Think, Spotify wrapped, but all year long. With Honey Hits, you can easily track your music taste; all your latest, greatest, and sweetest jams! 
            </p>
            <br />
            <h2 className="info-q">Do I have to have a Spotify to use this?</h2>
            <p className="info-a">Yes. This site was created using Spotify Web API. It requires you to login to utilize.</p>
            <br />
            <h2 className="info-q">What about my personal information?</h2>
            <p className="info-a">None of your information will be stored to any server or database. All of the information gathered is essentially just plugged in from your personalized Spotify data.</p>
            <a className="login-link" onClick={handleClose}>close</a>
            </div>
        </Modal.Body>
        </Modal>
    </div>
    );
}

