import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faMusic, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import logoSmall from "../assets/honey-small.png"

export default function Nav() {
    return(
        <div className="nav-container">
            <div className="nav-slideout">
            <img id="slideout" className="logo-small" src={logoSmall} alt="small honey hits logo" />
            <Link to="/artists" id="slideout" className="artists-button">
                <FontAwesomeIcon className="nav-icon" icon={faUsers} />
                <div>artists</div>
                </Link>
            <Link to="/songs" id="slideout" className="songs-button">
                <FontAwesomeIcon className="nav-icon" icon={faMusic} />
                <div>songs</div>
                </Link>
            <Link to="/" id="slideout" className="recent-button">
                <FontAwesomeIcon className="nav-icon" icon={faClock} /> 
                <div>recent</div>
            </Link>
        </div>
        </div>
    )
}