import React from "react";
import { Link } from "react-router-dom";

export default function PageContent(props) {

    return(
        <div className="header-container">
            <div className="header-img" style={{backgroundImage: `url('${props.headerImg}')`}} />
            <h2 className="page-title">{props.title}</h2>
            <Link to="/login" className="page-login-button">login</Link>
        </div>
    )
}