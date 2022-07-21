import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import FindTracks from './components/FindTracks';

function App() {

  const [token, setToken] = useState("");
  const [trackList, setTrackList] = useState([]);


  return (
    <div className="App">
      {/* {!token ? <LandingPage token={token} setToken={setToken} setTrackList={setTrackList} /> : <FindTracks token={token} setToken={setToken} />} */}

      <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={ <LandingPage token={token} setToken={setToken} setTrackList={setTrackList} /> }
                />
                <Route
                    path="/tracks"
                    element={ <FindTracks token={token} setToken={setToken} /> }
                />

            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
