import React, { useEffect, useState, useContext } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import yellow from "../assets/yellow.svg";
import body from "../components/backgrounds/body"
import { StateContext } from "../utils/StateProvider";
import TimeFrame from "../components/TimeFrame";

export default function TopArtists() {
    // const { getArtistData } = useContext(StateContext);
    const [artistData, setArtistData] = useState();
    const [timeFrame, setTimeFrame] = useState("short_term");
    const background = body;
    document.body.style = background;

    // useEffect(() => {
    //     const fetchArtistData = async () => {
    //     try {
    //         const token = await checkToken(); // Check if token is available
    //         const artists = await getArtistData(token, timeFrame); // Fetch artist data
    //         setArtistData(artists);
    //     } catch (error) {
    //         console.error('Error fetching artist data:', error);
    //     }
    //     }

    //     fetchArtistData();
    // }, [timeFrame]);

    return (
    <div className="topArtists-wrapper">
    <Nav />
    <div className="page-container">
        <Header headerImg={yellow} title="top artists" />
        <TimeFrame value={timeFrame} onChange={setTimeFrame} />
        <ol>
            {artistData &&
            artistData?.map((artist, index) => {
                return (
                <>
                    <a href={artist.uri} key={artist.id}>
                    <li className="artist-item" key={artist.id}>
                        <span className="artist-number">{index + 1}</span>
                        <span className="artist-info">
                        <span className="artist-flex">
                            <span>
                            <img
                                className="artist-img"
                                src={artist.images[1].url}
                                alt="artist album image"
                            />
                            </span>
                            <span>
                            <h2 className="artist-name">{artist.name}</h2>
                            <p className="artist-genre">
                                {artist.genres.slice(0, 3).join(", ")}
                            </p>
                            </span>
                        </span>
                        </span>
                    </li>
                    </a>
                    <hr />
                </>
            );
            })}
        </ol>
    </div>
    </div>
    );
}





// import React, {useEffect, useState} from "react";
// import axios from "axios";
// import config from "../utils/config";
// import Nav from "../components/Nav";
// import Header from "../components/Header";
// import yellow from "../assets/yellow.svg"
// import { useStateProvider } from "../utils/StateProvider";
// import { reducerCases } from "../utils/Constants";
// import TimeTabs from "../components/TimeTabs";

// export default function TopArtists() {
//     const [{ token, artistListItem }, dispatch] = useStateProvider();
//     const [data, setData] = useState()
//     const background = 
//     `background-image: radial-gradient(circle at top, white, rgb(222, 222, 222));
//     background-repeat: no-repeat;
//     background-attachment: fixed;
//     margin: 0;`

//     document.body.style = background;

//     useEffect(() => {
//         const getArtistData = async () => {
        
//             const response = await axios.get(`${config.API_URL}/me/top/artists?time_range=short_term&limit=50&offset=0`, {
//                 headers: {
//                     Authorization:`Bearer ${token}`,
//                     "Content-Type": 'application/json',
//                 },
//             }); 

//             const {items} = response.data;
            
//             const artists = items.map(({name, uri, id, genres, images}) => {
//                 return {name, uri, id, genres, images};
//             })
            

            
//             // console.log(items)
//             setData(artists)

//             dispatch({type: reducerCases.SET_TOP_ARTISTS, artistListItem})
//         }
//         getArtistData();
//     }, [token])
    
//     // console.log(data)

//     return(
//         <div className="topArtists-wrapper">
//             <Nav />
//             <div className="page-container">
//             <Header
//                 headerImg={yellow}
//                 title="top artists"
//                 />
//                 <TimeTabs />
//                 <ol>
//                 {data && data.map((artist, index) => {
//                     return <>
//                     <a href={artist.uri}  key={artist.id}>
//                     <li className="artist-item" key={artist.id}>
//                         <span className="artist-number">{index + 1}</span>
//                         <span className="artist-info">
//                             <span className="artist-flex">
//                                 <span>
//                                 <img className="artist-img" src={artist.images[1].url} alt="artist album image" />
//                                 </span>
//                                 <span>
//                                 <h2 className="artist-name">{artist.name}</h2>
//                                 <p className="artist-genre">
//                                 {artist.genres.slice(0, 3).join(", ")}</p>
//                                 </span>
//                             </span>
//                         </span>
//                         </li>
//                     </a>
//                         <hr /></>
//                 })}
//                 </ol>
//             </div>
//         </div>
//     )
// }