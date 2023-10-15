import React from "react";

export default function PageContent(props) {

    const logout = () => {
        localStorage.clear();
        window.location.reload();
        window.location.href = "/";
    }

    return(
        <div className="header-container">
            <div className="header-img" style={{backgroundImage: `url('${props.headerImg}')`}} />
            <h2 className="page-title">{props.title}</h2>
            <button onClick={logout} className="page-login-button">logout</button>
        </div>
    )
}