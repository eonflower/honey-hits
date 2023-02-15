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
  const [{ token, isLoggedIn }, dispatch] = useStateProvider();
  
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.split("=")[1];
      window.localStorage.setItem("token", token);
      dispatch({ type: reducerCases.SET_TOKEN, token });
      dispatch({ type: reducerCases.SET_LOGGED_IN, isLoggedIn: true });
      window.location.hash = '';
    } else {
      const storedToken = window.localStorage.getItem("token");
      if (storedToken) {
        const expirationTime = window.localStorage.getItem('expirationTime');
        if (Date.now() >= parseInt(expirationTime)) {
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('expirationTime');
          dispatch({ type: reducerCases.SET_TOKEN, token: null });
          dispatch({ type: reducerCases.SET_LOGGED_IN, isLoggedIn: false });
        } else {
          dispatch({ type: reducerCases.SET_TOKEN, token: storedToken });
          dispatch({ type: reducerCases.SET_LOGGED_IN, isLoggedIn: true });
        }
      }
    }
  }, [dispatch]);
  
  useEffect(() => {
    if (token) {
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
          {/* <Route path="/logout" element={<Navigate to="/" />} onClick={logout} /> */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
