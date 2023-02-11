import React from "react";
import Nav from "../components/Nav";
import PageView from "../components/PageView";

export default function TopSongs() {

    const background = 
        `background-image: radial-gradient(circle at top, white, rgb(222, 222, 222));
        background-repeat: no-repeat;
        background-attachment: fixed;
        margin: 0;`

        document.body.style = background
        
    return(
        <div className="topSongs-wrapper">
            <Nav />
            <PageView />
        </div>
    )
}