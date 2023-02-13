import React, {useEffect, useState} from "react";
import axios from "axios";
import config from "../utils/config";
import Nav from "../components/Nav";
import Header from "../components/Header";
import yellow from "../assets/yellow.svg"
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import TimeTabs from "../components/TimeTabs";

export default function TopArtists() {
    const [{ token, artistListItem }, dispatch] = useStateProvider();
    const [data, setData] = useState()
    const background = 
    `background-image: radial-gradient(circle at top, white, rgb(222, 222, 222));
    background-repeat: no-repeat;
    background-attachment: fixed;
    margin: 0;`

    document.body.style = background;

    useEffect(() => {
        const getArtistData = async () => {
        
            const response = await axios.get(`${config.API_URL}/me/top/artists?time_range=short_term&limit=50&offset=0`, {
                headers: {
                    Authorization:`Bearer ${token}`,
                    "Content-Type": 'application/json',
                },
            }); 

            const {items} = response.data;
            
            const artists = items.map(({name, uri, id, genres, images}) => {
                return {name, uri, id, genres, images};
            })
            

            
            // console.log(items)
            setData(artists)

            dispatch({type: reducerCases.SET_TOP_ARTISTS, artistListItem})
        }
        getArtistData();
    }, [token])
    
    // console.log(data)

    return(
        <div className="topArtists-wrapper">
            <Nav />
            <div className="page-container">
            <Header
                headerImg={yellow}
                title="top artists"
                />
                <TimeTabs />
                <ol>
                {data && data.map(artist => {
                    return <>
                    <a href={artist.uri}>
                    <li className="artist-list" key={artist.id}>
                        <span className="artist-info">
                            <span className="artist-flex">
                                <span>
                                    <img className="artist-img" src={artist.images[1].url} alt="artist album image" />
                                </span>
                                <span>
                                <h2 className="artist-name">{artist.name}</h2>
                                <p className="artist-genre">
                                    {artist.genres.slice(0, 3).join(", ")}</p>
                                </span>
                            </span>
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