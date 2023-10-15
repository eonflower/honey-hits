import React, { useContext } from "react";
import { StateContext } from "../utils/StateProvider";

export default function PageContent(props) {

    const { logout } = useContext(StateContext);

    return(
        <div className="header-container">
            <div className="header-img" style={{backgroundImage: `url('${props.headerImg}')`}} />
            <h2 className="page-title">{props.title}</h2>
            <button onClick={logout} className="page-login-button">logout</button>
        </div>
    )
}