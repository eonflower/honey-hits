import React, { useEffect, useState, useContext } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import yellow from "../assets/yellow.svg";
import body from "../components/backgrounds/body"
import TimeFrame from "../components/TimeFrame";
import axios from "axios";
import config from "../utils/config";
import { useStateProvider } from "../utils/StateProvider";
import { setArtistData } from "../utils/actions";

export default function TopArtists() {
    const [{ accessToken, isLoggedIn, topArtists }, dispatch] = useStateProvider();

    // Define states for timeFrame
    const [timeFrame, setTimeFrame] = useState("short_term");

    // Set the background for the body
    const background = body;
    document.body.style = background;

    // UseEffect to fetch artist data and set an interval to check token expiration
    useEffect(() => {
        // Function to fetch artist data
        const fetchArtistData = async () => {
            axios.get(
                `${config.API_URI}/me/top/artists?time_range=${timeFrame}&limit=50&offset=0`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(response => {
                // console.log(response);
                const { items } = response.data;
                // dispatch(setArtistData(items)); // Dispatch the action to set artist data in Redux store
                const artistData = items.map(({ name, uri, id, genres, images }) => {
                    return { name, uri, id, genres, images };
                });
                setArtistData(dispatch, artistData);
            });
            
        }
        // Call the fetchArtistData function
        fetchArtistData();

    }, [timeFrame, isLoggedIn]);


    return (
        <div className="topArtists-wrapper">
            <Nav />
            <div className="page-container">
                <Header headerImg={yellow} title="top artists" />
                <TimeFrame value={timeFrame} onChange={setTimeFrame} />
                <ol>
                    {topArtists &&
                    topArtists?.map((artist, index) => {
                        return (
                            <React.Fragment key={artist.id}>
                                <a href={artist.uri}>
                                    <li className="artist-item">
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
                            </React.Fragment>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}