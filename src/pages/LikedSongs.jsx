import _ from "lodash";
import React, { useEffect, useState, useContext } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import { StateContext } from "../utils/StateProvider";
import pink from "../assets/pink.svg"
import body from "../components/backgrounds/body"
import msToMin from "../components/msToMin";


export default function LikedSongs() {
    const { getLikedData } = useContext(StateContext);
    const [token, setToken] = useState();
    const [likedData, setLikedData] = useState();

    const background = body
    document.body.style = background

    // useEffect(() => {
    //     const fetchLikedData = async () => {
    //         try {
    //             const token = await checkToken();
    //             setToken(token);
    //             const likedData = await getLikedData(token);
    //             setLikedData(likedData);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchLikedData();
    // }, []);
        
        // useEffect(() => {
        //     // Assuming you have a way to retrieve the token, set it here
        //     // For example, you might have a function like setToken(getTokenFromLocalStorage())
        //     // Make sure to implement getTokenFromLocalStorage() to get the token from where you store it
        // }, []);


    return(
        <div className="likedSongs">
            <Nav />
                <div className="page-container">
                <Header 
                headerImg={pink}
                title="recently liked songs"
                />
                <ol className="liked-list">
                {likedData && 
                likedData?.map((liked, index) => {
                    return <>
                    <a href={liked.track.uri}  key={liked.track.id}>
                    <li className="liked-item" key={liked.track.id}>
                    <span className="liked-number">{index + 1}</span>
                        <span className="liked-info">
                            <span className="liked-flex">
                                <span>
                                <img className="liked-img" src={_.get(liked, ['track', 'album', 'images', 1, 'url'])} alt="album image" />
                                </span>
                                <span>
                                <h2 className="liked-name">{liked.track.name}</h2>
                                <p className="liked-artist">{_.get(liked, ['track', 'artists', 0, 'name'])}</p>
                                </span>
                            </span>
                            <h4 className="song-timing">{msToMin(liked.track.duration_ms)}</h4>
                        </span>
                        </li>
                    </a>
                        <hr /></>
                })}
                </ol>
                </div>
            
        </div>
    )
}
