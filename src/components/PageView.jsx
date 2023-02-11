import React from "react";
import RecentlyPlayed from "../pages/RecentlyPlayed";
import TopArtists from "../pages/TopArtists";
import Header from "./Header";
import Nav from "./Nav";

export default function PageView(props) {
    return(
        <div className="page-wrapper">
            <Nav />
            <div className="page-container">
            <Header title={props.header}/>
            <RecentlyPlayed />
            <TopArtists />
            </div>
        </div>
    )
}