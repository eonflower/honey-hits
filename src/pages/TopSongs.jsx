import React, {useEffect, useState, useContext} from "react";
import { StateContext } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import _ from "lodash";
import Nav from "../components/Nav";
import Header from "../components/Header";
import peach from "../assets/peach.svg"
import body from "../components/backgrounds/body"
import TimeFrame from "../components/TimeFrame";
import msToMin from "../components/msToMin";



export default function TopSongs() {
    // const { getSongData } = useContext(StateContext);
    const [songData, setSongData] = useState();
    const [timeFrame, setTimeFrame] = useState("short_term");
    const background = body;
    document.body.style = background;

    // useEffect(() => {
    //     const fetchSongData = async () => {
    //         try {
    //         const token = await checkToken(); // Check if token is available
    //         const songs = await getSongData(token, timeFrame); // Fetch song data
    //         setSongData(songs);
    //         } catch (error) {
    //         console.error('Error fetching song data:', error);
    //         }
    //     }
    
    //     fetchSongData();
    //     }, [timeFrame]);
        
        
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

