import React from "react";
import { Navigate } from "react-router-dom";
import { useStateProvider } from "../utils/StateProvider";
import { setIsLoggedIn, setUserData } from "../utils/actions";

export default function PageContent(props) {
    const [{ isLoggedIn, userData }, dispatch] = useStateProvider();

    const logout = () => {
        setIsLoggedIn(dispatch, false);
        setUserData(dispatch, {});
        localStorage.clear();
        window.location.reload();
        window.location.href = "/";
        <Navigate to="/" />
    }

    return(
        <div className="header-container">
            <div className="header-img" style={{backgroundImage: `url('${props.headerImg}')`}} />
            <h2 className="page-title">{props.title}</h2>
            <button onClick={logout} className="page-login-button">logout</button>
        </div>
    )
}