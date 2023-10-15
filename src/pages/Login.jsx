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
            window.location.reload();
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

