import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState} from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import config from "../utils/config";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import pink from "../assets/pink.svg"


export default function RecentlyPlayed() {
    const background = 
        `background-image: radial-gradient(circle at top, white, rgb(222, 222, 222));
        background-repeat: no-repeat;
        background-attachment: fixed;
        margin: 0;`

        document.body.style = background

    const [{ token, likedListItem }, dispatch] = useStateProvider();
    const [data, setData] = useState()

    useEffect(() => {
        const getLikedData = async () => {
        
            const response = await axios.get(`${config.API_URL}/me/tracks?limit=50&offset=0`, {
                headers: {
                    Authorization:`Bearer ${token}`,
                    "Content-Type": 'application/json',
                },
            }); 

            const {items} = response.data;
            
            const liked = items.map(({track, name, id, artists, album}) => {
                return {track, name, id, artists, album};
            })
            

            
            // console.log(items)
            setData(liked)
            console.log(items)

            dispatch({type: reducerCases.SET_TOP_LIKED, likedListItem})
        }
        getLikedData();
    }, [token])


    return(
        <div className="likedSongs-wrapper">
            <Nav />
                <div className="page-container">
                <Header 
                headerImg={pink}
                title="recently liked songs"
                />
                <ol>
                {data && data.map(liked => {
                    return <>
                    <li className="liked-list" key={liked.id}>
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
                        </span>
                        </li>
                        <hr /></>
                })}
                </ol>
                </div>
            
        </div>
    )
}

// const response = await axios.get(`${config.API_URL}/me/tracks?limit=50&offset=0`, {
//     headers: {
//         Authorization:`Bearer ${token}`,
//         "Content-Type": 'application/json',
//     },
// }); 