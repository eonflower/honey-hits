import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import RecentlyPlayed from './pages/RecentlyPlayed';
import TopArtists from './pages/TopArtists';
import TopSongs from './pages/TopSongs';
import config from "./utils/config"
import { reducerCases } from './utils/Constants';
import { useStateProvider } from './utils/StateProvider';

function App() {

  const [accessToken, setAccessToken] = useState()
  const [{ token }, dispatch] = useStateProvider()

  useEffect(() => {
   const hash = window.location.hash;
   if (hash) {
    const token = hash.substring(1).split("&")[0].split("=")[1];
    dispatch({ type: reducerCases.SET_TOKEN, token })
   }
  }, [token, dispatch])

  return (
    <div className="app">
      {/* {token ? <PageView /> : <Login />} */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RecentlyPlayed />} />
        <Route path="/artists" element={<TopArtists />} />
        <Route path="/songs" element={<TopSongs />} />
      </Routes>
    </div>
  )
}

export default App


//  // API Access Token
//  let authParams = {
//   method: 'POST',
//   headers: {
//     'Content-type': "application/x-www-form-urlencoded"
//   },
//   body: 'grant_type=client_credentials&client_id=' + config.CLIENT_ID + '&client_secret=' + config.CLIENT_SECRET
// }
// fetch("https://accounts.spotify.com/api/token", authParams)
//   .then(result => result.json())
//   .then(data => setAccessToken(data.access_token))
