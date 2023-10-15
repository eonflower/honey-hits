import { useEffect, useContext, useState } from 'react';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import { StateContext} from './utils/StateProvider';
import _ from 'lodash';

import Login from './pages/Login';
import LikedSongs from './pages/LikedSongs';
import TopArtists from './pages/TopArtists';
import TopSongs from './pages/TopSongs';


function App() {
  
  const { tokenEvents, access_token, refreshToken, expires_at } = useContext(StateContext);
  const [token, setToken] = useState(null);
  const [time, setTime] = useState(null);
  const location = useLocation();
  const oneMinuteLess = expires_at - 60000;

  const checkTime = () => {
      let latestTime = new Date().getTime();
      setTime(latestTime);
  };

  useEffect(() => {
    if (location.pathname !== '/login') {
      Object.values(tokenEvents).forEach((item) => {
        window.addEventListener(item, () => {
          checkTime();
          time > oneMinuteLess ? refreshToken() : setToken(access_token);
        });
      });
    }
  }, [checkTime]);

  return (
    <div className="app">
      {!token ? (location.pathname = "/login", <Login />) : (
        <Routes>
          <Route path="/liked" element={<LikedSongs />} />
          <Route path="/artists" element={<TopArtists />} />
          <Route path="/songs" element={<TopSongs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
