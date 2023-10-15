import { useEffect, useContext, useState } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import { StateContext} from './utils/StateProvider';
import _ from 'lodash';

import Login from './pages/Login';
import LikedSongs from './pages/LikedSongs';
import TopArtists from './pages/TopArtists';
import TopSongs from './pages/TopSongs';


function App() {
  
  const { tokenEvents, events, access_token, expires_at } = useContext(StateContext);
  const [token, setToken] = useState(null);
  const [time, setTime] = useState(null);
  const oneMinuteLess = expires_at - 60000;

  useEffect(() => {
    Object.values(tokenEvents).forEach((item) => {
      window.addEventListener(item, () => {
        checkTime();
        time === null ? (setToken(null), <Navigate to="/login" />) 
        : time > oneMinuteLess
          ? (refreshToken())
          : setToken(access_token);
        // console.log(
        //   "current time: " + time,
        //   "expires at: " + expires_at,
        //   "one minute less: " + oneMinuteLess
        // );
      });
    });
  }, [checkTime]);

  return (
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
