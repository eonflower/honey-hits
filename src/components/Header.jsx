import React from "react";

export default function Header(props) {
    return(
        <div className="header">
            <h2 className="header-title">{props.title}</h2>
        </div>
    )
}