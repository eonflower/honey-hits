import React, { useEffect, useState, useContext } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import yellow from "../assets/yellow.svg";
import body from "../components/backgrounds/body"
import { StateContext } from "../utils/StateProvider";
import TimeFrame from "../components/TimeFrame";
import axios from "axios";
import config from "../utils/config";

export default function TopArtists() {
    const { isAccessTokenExpired, access_token, refreshToken } = useContext(StateContext);

    // Define states for artistData and timeFrame
    const [artistData, setArtistData] = useState();
    const [timeFrame, setTimeFrame] = useState("short_term");

    // Set the background for the body
    const background = body;
    document.body.style = background;

    // UseEffect to fetch artist data and set an interval to check token expiration
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

        // Function to fetch artist data
        const fetchArtistData = async () => {
            axios.get(
                `${config.API_URI}/me/top/artists?time_range=${timeFrame}&limit=50&offset=0`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(response => {
                console.log(response);
                const { items } = response.data;
                setArtistData(items);
                return items.map(({ name, uri, id, genres, images }) => {
                    return { name, uri, id, genres, images };
                });
            });
            return () => clearInterval(tokenCheckInterval);
        }

        // Call the fetchArtistData function
        fetchArtistData();

        // Clean up the interval when the component is unmounted or the dependency 'timeFrame' changes
        return () => clearInterval(tokenCheckInterval);
    }, [timeFrame]);


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