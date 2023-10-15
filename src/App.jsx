  import { useEffect, useContext } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import { StateContext} from './utils/StateProvider';
import _ from 'lodash';

import Login from './pages/Login';
import LikedSongs from './pages/LikedSongs';
import TopArtists from './pages/TopArtists';
import TopSongs from './pages/TopSongs';






function App() {

  const { access_token } = useContext(StateContext);

  useEffect(() => {
    if (access_token) {
      <Navigate to='/' />; // Redirect to login page if not authenticated
    }
  }, []);

  return (
    <div className="app">
      {!access_token ? <Login /> : (
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
