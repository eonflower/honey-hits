  import { useEffect, useState, useContext } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import config from "./utils/config"
import { StateContext} from './utils/StateProvider';
import { reducerCases } from './utils/Constants';
import _, { get, set } from 'lodash';

import Login from './pages/Login';
import LikedSongs from './pages/LikedSongs';
import TopArtists from './pages/TopArtists';
import TopSongs from './pages/TopSongs';






function App() {
  const { getAccessToken, getUserData, access_token, refresh_token, expires_at } = useContext(StateContext);
    // Restore tokens from localStorage

  const [token, setToken] = useState();

  useEffect(() => {
    const args = new URLSearchParams(window.location.search);
    const code = args.get('code');
    if (code) {
      // we have received the code from spotify and will exchange it for a access_token
      getAccessToken(code);
    } else if (access_token && refresh_token && expires_at) {
      // we are already authorized and reload our tokens from localStorage
      getUserData();
      setToken(access_token);
    } else {
    <Navigate to='/login' />
    }
}, [access_token]);



// useEffect(() => {
//   const getUserAuth = () => {
//     const hash = window.location.hash;
//     if (hash) {
//         const token = hash.split("=")[1];
//         window.localStorage.setItem("access_token", token);
//         setToken(token);
        
//         axios.get('/api/auth/callback', {
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded',
//             Authorization: `Bearer ${token}`},
//                 client_id: config.CLIENT_ID,
//                 access_token: token,
    
//             })
//     } else {
//         <Navigate to="/login" />;
//     }
// }
// getUserAuth();
// }, [token]);

  return (
  //   <div className="app">
  //     <Routes>
  //       <Route path="/" element={<LikedSongs />} />
  //       <Route path="/artists" element={<TopArtists />} />
  //       <Route path="/songs" element={<TopSongs />} />
  //       <Route path="/login" element={<Login />} />
  //     </Routes>
  // </div>

  
    <div className="app">
      {!token ? <Login /> : (
        <Routes>
          <Route path="/" element={<LikedSongs />} />
          <Route path="/artists" element={<TopArtists />} />
          <Route path="/songs" element={<TopSongs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
