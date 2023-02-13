import React, {useState} from "react";
import { Button, Modal } from "react-bootstrap";
import logoBig from "../assets/honey-big.png"
import config from "../utils/config";
import InfoModal from "../components/InfoModal";


export default function Login(props) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(!show);


    const background =
    `background-color:hsla(298,84%,82%,1);
    background-image:
    radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%),
    radial-gradient(at 80% 0%, hsla(45,100%,56%,1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, hsla(264,100%,82%,1) 0px, transparent 50%),
    radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
    radial-gradient(at 0% 100%, hsla(18,100%,60%,1) 0px, transparent 50%),
    radial-gradient(at 80% 100%, hsla(254,96%,83%,1) 0px, transparent 50%),
    radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%);
    background-attachment: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0`

    document.body.style = background

    const handleClick = () => {
        window.location.href = `${config.AUTH_URL}?client_id=${config.CLIENT_ID}&redirect_uri=${config.CALLBACK_URL}&scope=${config.AUTH_SCOPES.join(
            " "
            )}&response_type=token&show_dialog=true`;
    };

    return(
        <div className="login-wrapper">
            <img className="logo-big" src={logoBig} alt="honey hits logo"  />
            <span className="button-span">
            <Button onClick={handleClick} className="login-button">Connect Spotify</Button>
            {/* <a className="info-link" onClick={handleShow}>What's Honey Hits?</a> */}
            </span>

            
{/* 
        <InfoModal /> */}
        </div>
    )
}