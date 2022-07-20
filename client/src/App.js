import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import FindTracks from './components/FindTracks';

function App() {

  const [token, setToken] = useState("");

  return (
    <div className="App">
      {!token ? <LandingPage token={token} setToken={setToken} /> : <FindTracks token={token} setToken={setToken} />}
    </div>
  );
}

export default App;
