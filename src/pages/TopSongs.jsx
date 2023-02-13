import React, {useEffect, useState} from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import _ from "lodash";
import axios from "axios";
import config from "../utils/config";
import Nav from "../components/Nav";
import Header from "../components/Header";
import peach from "../assets/peach.svg"


export default function TopSongs() {
    const [{ token, songListItem }, dispatch] = useStateProvider();
    const [data, setData] = useState()
    const background = 
        `background-image: radial-gradient(circle at top, white, rgb(222, 222, 222));
        background-repeat: no-repeat;
        background-attachment: fixed;
        margin: 0;`

        document.body.style = background

        useEffect(() => {
            const getSongData = async () => {
            
                const response = await axios.get(`${config.API_URL}/me/top/tracks?time_range=short_term&limit=50&offset=0`, {
                    headers: {
                        Authorization:`Bearer ${token}`,
                        "Content-Type": 'application/json',
                    },
                }); 
    
                const {items} = response.data;
                
                const songs = items.map(({name, id, artists, album}) => {
                    return {name, id, artists, album};
                })
                
    
                
                // console.log(items)
                setData(songs)
                console.log(items)
    
                dispatch({type: reducerCases.SET_TOP_SONGS, songListItem})
            }
            getSongData();
        }, [token])

        
        
    return(
        <div className="topSongs-wrapper">
            <Nav />
            <div className="page-container">
                <Header
                headerImg={peach}
                title="top songs"
                />
                <ol>
                {data && data.map(song => {
                
                    return <>
                    <li className="song-list" key={song.id}>
                        <span className="song-info">
                            <span className="song-flex">
                                <span>
                                <img className="song-img" src={_.get(song, ['album', 'images', 1, 'url'])} alt="song album image" />
                                </span>
                                <span>
                                <h2 className="song-name">{song.name}</h2>
                                <p className="song-artist">{_.get(song, ['artists', 0, 'name'])}</p>
                                </span>
                            </span>
                        </span>
                        </li>
                        <hr /></>
                })}
                </ol>
            </div>
        </div>
    )
}