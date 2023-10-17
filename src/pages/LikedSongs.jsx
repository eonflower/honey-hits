import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import axios from "axios";
import config from "../utils/config";
import Nav from "../components/Nav";
import Header from "../components/Header";
import pink from "../assets/pink.svg"
import body from "../components/backgrounds/body"
import msToMin from "../components/msToMin";
import { useStateProvider } from "../utils/StateProvider";
import { setLikedData } from "../utils/actions";


export default function LikedSongs() {
    const [{ isLoggedIn, accessToken, recentlyLiked }, dispatch] = useStateProvider();

    // Set the background for the body
    const background = body
    document.body.style = background


    useEffect(() => {
        const getLikedData = async () => {
        
            const response = await axios.get(`${config.API_URI}/me/tracks?limit=50&offset=0`, {
                headers: {
                    Authorization:`Bearer ${accessToken}`,
                    "Content-Type": 'application/json',
                },
            }); 
            const {items} = response.data;
            const liked = items.map(({track, duration_ms, uri, name, id, artists, album}) => {
                return {track, duration_ms, uri, name, id, artists, album};
            })

            setLikedData(dispatch, liked)
            // console.log(items)

        }
        getLikedData();
    }, [isLoggedIn, dispatch])

    return (
        <div className="likedSongs">
            <Nav />
            <div className="page-container">
                <Header 
                    headerImg={pink}
                    title="recently liked songs"
                />
                <ol className="liked-list">
                    {recentlyLiked && 
                        recentlyLiked?.map((liked, index) => {
                            return (
                                <React.Fragment key={liked.track.id}>
                                    <a href={liked.track.uri}>
                                        <li className="liked-item">
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
                                    <hr />
                                </React.Fragment>
                            );
                        })
                    }
                </ol>
            </div>
        </div>
    )
}