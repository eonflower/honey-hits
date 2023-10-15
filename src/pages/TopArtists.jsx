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