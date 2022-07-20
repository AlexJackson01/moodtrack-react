import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';

function App() {

  const [token, setToken] = useState("");

  return (
    <div className="App">
      <LandingPage setToken={setToken} />
    </div>
  );
}

export default App;
