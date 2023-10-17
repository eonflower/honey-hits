import React, {useEffect, useState} from "react";
import axios from "axios";
import config from "../utils/config";
import _ from "lodash";
import Nav from "../components/Nav";
import Header from "../components/Header";
import peach from "../assets/peach.svg"
import body from "../components/backgrounds/body"
import TimeFrame from "../components/TimeFrame";
import msToMin from "../components/msToMin";
import { useStateProvider } from "../utils/StateProvider";
import { setSongData } from "../utils/actions";



export default function TopSongs() {
    const [{ accessToken, isLoggedIn, topSongs }, dispatch] = useStateProvider();
    // Define states for timeFrame
    const [timeFrame, setTimeFrame] = useState("short_term");

    // Set the background for the body
    const background = body;
    document.body.style = background;

    // UseEffect to fetch song data and set an interval to check token expiration
    useEffect(() => {
        // Function to fetch song data
        const fetchSongData = async () => {
            axios.get(
                `${config.API_URI}/me/top/tracks?time_range=${timeFrame}&limit=50&offset=0`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                })
                .then(response => {
                    const { items } = response.data;
                    // dispatch(setSongData(items));
                    const songData = items.map(({ name, duration_ms, uri, id, artists, album }) => {
                        return { name, duration_ms, uri, id, artists, album };
                    });
                    setSongData(dispatch, songData);
                });
        }

        // Call the fetchSongData function
        fetchSongData();

    }, [timeFrame, isLoggedIn]);

        
        
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
                {topSongs && topSongs?.map((song, index) => {
                
                    return (
                        <React.Fragment key={song.id}>
                        <a href={song.uri}>
                            <li className="song-item">
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
                    </React.Fragment>
                    );
                })}
                </ol>
            </div>
        </div>
    )
}

