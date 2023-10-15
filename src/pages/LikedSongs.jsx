import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import axios from "axios";
import config from "../utils/config";
import Nav from "../components/Nav";
import Header from "../components/Header";
import { StateContext } from "../utils/StateProvider";
import pink from "../assets/pink.svg"
import body from "../components/backgrounds/body"
import msToMin from "../components/msToMin";


export default function LikedSongs() {
    const { access_token } = useContext(StateContext);

    // Define state for likedData
    const [likedData, setLikedData] = useState();

    // Set the background for the body
    const background = body
    document.body.style = background

    // UseEffect to fetch liked data and set an interval to check token expiration
    useEffect(() => {
        // Function to fetch liked data
        const fetchLikedData = async () => {
            axios.get(`${config.API_URI}/me/tracks?limit=50&offset=0`, {
                headers: {
                    Authorization:`Bearer ${access_token}`,
                    "Content-Type": 'application/json',
                },
            })
            .then(response => {
                console.log(response);
                const {items} = response.data;
                setLikedData(items);
            
                return items.map(({track, duration_ms, uri, name, id, artists, album}) => {
                    return {track, duration_ms, uri, name, id, artists, album};
                });
            });
        }

        // Call the fetchLikedData function
        fetchLikedData();
    }, []);

    return (
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