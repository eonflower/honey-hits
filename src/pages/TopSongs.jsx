import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import { StateContext } from "../utils/StateProvider";
import config from "../utils/config";
import _ from "lodash";
import Nav from "../components/Nav";
import Header from "../components/Header";
import peach from "../assets/peach.svg"
import body from "../components/backgrounds/body"
import TimeFrame from "../components/TimeFrame";
import msToMin from "../components/msToMin";



export default function TopSongs() {
    const { isAccessTokenExpired, access_token } = useContext(StateContext);

    
    // Define states for songData and timeFrame
    const [songData, setSongData] = useState();
    const [timeFrame, setTimeFrame] = useState("short_term");

    // Set the background for the body
    const background = body;
    document.body.style = background;

    // UseEffect to fetch song data and set an interval to check token expiration
    useEffect(() => {
        // Function to check token expiration and refresh if needed
        const checkTokenExpiration = () => {
            if (isAccessTokenExpired()) {
                refreshToken();
            }
        }

        // Define the interval to check token expiration every 30 minutes
        const thirtyMinutes = 1000 * 60 * 30; // 30 minutes in milliseconds
        const tokenCheckInterval = setInterval(checkTokenExpiration, thirtyMinutes); // Check every 30 minutes

        // Function to fetch song data
        const fetchSongData = async () => {
            axios.get(
                `${config.API_URI}/me/top/tracks?time_range=${timeFrame}&limit=50&offset=0`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-Type": "application/json",
                    },
                })
                .then(response => {
                    const { items } = response.data;
                    setSongData(items);
                    return items.map(({ name, duration_ms, uri, id, artists, album }) => {
                        return { name, duration_ms, uri, id, artists, album };
                    });
                });
            return () => clearInterval(tokenCheckInterval);
        }

        // Call the fetchSongData function
        fetchSongData();

        // Clean up the interval when the component is unmounted or the dependency 'timeFrame' changes
        return () => clearInterval(tokenCheckInterval);
    }, [timeFrame]);

        
        
    return(
        <div className="topSongs-wrapper">
            <Nav />
            <div className="page-container">
                <Header
                headerImg={peach}
                title="top songs"
                />
                <TimeFrame value={timeFrame} onChange={setTimeFrame} />
                <ol>
                {songData && songData?.map((song, index) => {
                
                    return (
                        <a href={song.uri} key={song.id}>
                            <li className="song-item" key={song.id}>
                                <span className="song-number">{index + 1}</span>
                                <span className="song-info">
                                    <span className="song-flex">
                                        <span>
                                        <img className="song-img" src={_.get(song, ['album', 'images', 1, 'url'])} alt="song album" />
                                        </span>
                                        <span>
                                        <h2 className="song-name">{song.name}</h2>
                                        <p className="song-artist">{_.get(song, ['artists', 0, 'name'])}</p>
                                        </span>
                                    </span>
                                    <h4 className="song-timing">{msToMin(song.duration_ms)}</h4>
                                </span>
                            </li>
                            <hr />
                        </a>
                    );
                })}
                </ol>
            </div>
        </div>
    )
}

