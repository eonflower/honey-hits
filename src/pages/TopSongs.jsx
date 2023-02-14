import React, {useEffect, useState} from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import _ from "lodash";
import axios from "axios";
import config from "../utils/config";
import Nav from "../components/Nav";
import Header from "../components/Header";
import peach from "../assets/peach.svg"
import TimeFrame from "../components/TimeFrame";
import msToMin from "../components/msToMin";



export default function TopSongs() {
    const [{ token, songListItem }, dispatch] = useStateProvider();
    const [timeFrame, setTimeFrame] = useState("short_term");
    const [data, setData] = useState()
    const background = 
        `background-image: radial-gradient(circle at top, white, rgb(222, 222, 222));
        background-repeat: no-repeat;
        background-attachment: fixed;
        margin: 0;`

        document.body.style = background

        useEffect(() => {
            const getSongData = async () => {
            
                const response = await axios.get(`${config.API_URL}/me/top/tracks?time_range=${timeFrame}&limit=50&offset=0`, {
                    headers: {
                        Authorization:`Bearer ${token}`,
                        "Content-Type": 'application/json',
                    },
                }); 
    
                const {items} = response.data;
                
                const songs = items.map(({name, duration_ms, uri, id, artists, album}) => {
                    return {name, duration_ms, uri, id, artists, album};
                })
                
    
                
                // console.log(items)
                setData(songs)
                console.log(items)
    
                dispatch({type: reducerCases.SET_TOP_SONGS, songListItem})
            }
            getSongData();
        }, [timeFrame, token])

        
        
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
                {data && data.map((song, index) => {
                
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

