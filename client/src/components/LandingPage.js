import React from 'react'
import { useEffect } from 'react';

export default function LandingPage({ setToken }) {

    useEffect(() => {

        getToken();
      
      }, [])

    const CLIENT_ID = 'd6164693bccb4f4eab924abd717fdf37';
    const REDIRECT_URI = 'http://localhost:3000';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';
    const SCOPES = "streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

    const getToken = () => {
        let urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
        let token = urlParams.get("access_token");
        window.localStorage.setItem("token", token);
        setToken(token)
      }


  return (
    <div className='container'>
        <div className='logo-container'>
            <img className='moodtrack-logo' src={Logo} alt='moodtrack logo' />
            <h1>Take time to reflect and discover tracks to fit any mood</h1>
            <img className='brain-icon' src={Brain} alt='brain with a music note in the middle' />
            <h2>Login with:</h2>
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`} ><img className='spotify-logo' src={Spotify} alt='spotify logo' /></a>
        </div>
  </div>
  )
}
