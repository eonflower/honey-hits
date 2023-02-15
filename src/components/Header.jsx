import React from "react";

export default function PageContent(props) {

    return(
        <div className="header-container">
            <div className="header-img" style={{backgroundImage: `url('${props.headerImg}')`}} />
            <h2 className="page-title">{props.title}</h2>
            <a className="page-login-button" href="/login">login</a>
        </div>
    )
}