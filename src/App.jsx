import { useEffect, useContext, useState } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';


import { StateContext} from './utils/StateProvider';
import _ from 'lodash';

import Login from './pages/Login';
import LikedSongs from './pages/LikedSongs';
import TopArtists from './pages/TopArtists';
import TopSongs from './pages/TopSongs';


function App() {
  
  const { tokenEvents, access_token, expires_at, logout } = useContext(StateContext);
  const [token, setToken] = useState(null);
  // const [time, setTime] = useState(null);
  const oneMinuteLess = expires_at - 60000;

  const checkTime = () => {
    return new Date().getTime() > oneMinuteLess;
  };


useEffect(() => {

  tokenEvents.forEach(item => {
    window.addEventListener(item, () => {
      token && checkTime() ? logout()
      : setToken(access_token);
    });
  });
}, []); // Empty dependency array ensures this effect only runs once

  return (
    <div className="app">
      {!token ? <Login /> : (
        <Routes>
          <Route path="/" element={<LikedSongs />} />
          <Route path="/artists" element={<TopArtists />} />
          <Route path="/songs" element={<TopSongs />} />
          3<Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
