import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import config from "./utils/config"
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/Constants';
import _ from 'lodash';

import Login from './pages/Login';
import LikedSongs from './pages/LikedSongs';
import TopArtists from './pages/TopArtists';
import TopSongs from './pages/TopSongs';




function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.split("=")[1];
      window.localStorage.setItem("token", token);
      dispatch({ type: reducerCases.SET_TOKEN, token });
      window.location.hash = '';
    } else {
      const token = window.localStorage.getItem("token");
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      } else {
        <Navigate to="/login" />
      }
    }


  }, [dispatch]);



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

