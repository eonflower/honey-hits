import axios from "axios";
import React, { useEffect } from "react";
import Nav from "../components/Nav";
import PageView from "../components/PageView";
import config from "../utils/config";
import { useStateProvider } from "../utils/StateProvider";

export default function RecentlyPlayed() {
    const background = 
        `background-image: radial-gradient(circle at top, white, rgb(222, 222, 222));
        background-repeat: no-repeat;
        background-attachment: fixed;
        margin: 0;`

        document.body.style = background

    const [{ token }, dispatch] = useStateProvider();
    useEffect(() => {
        const getRecentData = async () => {
            const response = await axios.get(`${config.API_URL}/me/player/recently-played`, {
                headers: {
                    Authorization:`Bearer ${token}`,
                    "Content-Type": 'application/json',
                },
            }); 
            const {items} = response.data;
            const recent = items.map(({name, id}) => {
                return {name, id};
            })
            console.log(recent)
        }
        getRecentData();
    }, [token, dispatch])

    return(
        <div className="recentlyPlayed-wrapper">
            <Nav />
            <PageView header="Recently Played" />
            
        </div>
    )
}