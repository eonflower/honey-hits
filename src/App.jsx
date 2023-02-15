import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import config from "./utils/config"
import { useStateProvider } from './utils/StateProvider';

import Login from './pages/Login';
import LikedSongs from './pages/LikedSongs';
import TopArtists from './pages/TopArtists';
import TopSongs from './pages/TopSongs';
import { reducerCases } from './utils/Constants';

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
      const storedToken = window.localStorage.getItem("token");
      const expirationTime = window.localStorage.getItem('expirationTime');
      if (storedToken && expirationTime && Date.now() < parseInt(expirationTime)) {
        dispatch({ type: reducerCases.SET_TOKEN, token: storedToken });
      } else {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('expirationTime');
        dispatch({ type: reducerCases.SET_TOKEN, token: null });
      }
    }
  }, [dispatch]);
  
  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
      window.localStorage.setItem('expirationTime', Date.now() + 3600000);
    }
  }, [token]);
  
  return (
    <div className="app">
      {!token ? <Login /> : (
        <Routes>
          <Route path="/" element={<LikedSongs/>} />
          <Route path="/artists" element={<TopArtists />} />
          <Route path="/songs" element={<TopSongs />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

function Logout() {
  const [, dispatch] = useStateProvider();
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('expirationTime');
  dispatch({ type: reducerCases.SET_TOKEN, token: null });
  return <Navigate to="/login" />;
}

export default App;
