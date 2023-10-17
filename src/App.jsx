import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useStateProvider } from './utils/StateProvider';
import { Navigate } from 'react-router-dom';
import _ from 'lodash';

import Login from './pages/Login';
import LikedSongs from './pages/LikedSongs';
import TopArtists from './pages/TopArtists';
import TopSongs from './pages/TopSongs';
import './App.css';
import {
  setAccessToken,
  setIsLoggedIn,
  setUserData
} from "./utils/actions"; // Import action creators

function App() {
  const [{ accessToken, refreshToken, expiresAt, isLoggedIn }, dispatch] = useStateProvider();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const access_token = localStorage.getItem('access_token');
  const expires_at = localStorage.getItem('expires_at');
  const isLoggedInStorage = localStorage.getItem('isLoggedIn');
  const tokenEvents = ['load', 'click', 'mousedown', 'keypress'];
  const oneMinuteLess = expires_at - 60000;

  const logout = () => {
    setIsLoggedIn(dispatch, false);
    setUserData(dispatch, {});
    localStorage.clear();
    window.location.reload();
    window.location.href = "/";
    <Navigate to="/" />
}

  const checkTime = () => {
    return new Date().getTime() > oneMinuteLess;
  };


useEffect(() => {
  if (access_token) {
    setAccessToken(dispatch, access_token);
  }
  tokenEvents.forEach(item => {
    window.addEventListener(item, () => {
      if (checkTime()) {
        logout();
      }
    });
  });
  
}, []); // Empty dependency array ensures this effect only runs once

  return (
    <div className="app">
      {accessToken ? (
        <Routes>
          <Route path="/" element={<LikedSongs />} />
          <Route path="/artists" element={<TopArtists />} />
          <Route path="/songs" element={<TopSongs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
