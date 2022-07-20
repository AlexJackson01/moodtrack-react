import { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../images/MoodTrack_logo.png';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function FindTracks({ token, setToken }) {

    const [trackList, setTrackList] = useState([]);
    const [showTrack, setShowTrack] = useState(false);
    const [dance, setDance] = useState("");
    const [energy, setEnergy] = useState("");
    const [valence, setValence] = useState(""); 

    const logout = (e) => {
        e.preventDefault();
        window.location.href = "/";

        setToken("");
        window.localStorage.removeItem("token");
    }

    const getRandomSearch = () => {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
        let randomSearch = '%' + randomCharacter + '%';
      
        return randomSearch;
    }

    const getRandomOffset = () => {
        const randomOffset = Math.floor(Math.random() * 1000);

        return randomOffset;
    }

    let tracks = [];
    let features = [];

    const findTracks = async () => {

        // generate 50 random tracks
        const res = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            type: "track",
            q: getRandomSearch(),
            limit: 50,
            offset: getRandomOffset()
          }
        })
      
        const data = res.data.tracks.items;  
      
        for (let track of data) {
          tracks.push({
            id: track.id,
            track_name: track.name,
            artists: track.artists[0].name,
            uri: track.uri,
            external: track.external_urls.spotify,
            image: track.album.images[1].url
          })
        }
    
        // call audio features for 50 random tracks
        for (let track of tracks) {
          const res2 = await axios.get(`https://api.spotify.com/v1/audio-features/${track.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          features.push(res2.data);
        }
      
        let combined = tracks.map((item, i) => Object.assign({}, item, features[i])); // the results from search 1 and 2 are joined together

        setTrackList(combined);
        console.log(trackList);
    
    }

    // useEffect(() => {
    //     findTracks();
    // }, [token])

    const findRecommendation = (e) => {
  
    }

  return (
    <div>
        <div className='logo-container'>
            <img className='moodtrack-logo-small' src={Logo} alt='moodtrack logo' />
            <button onClick={(e) => logout(e)}>Logout</button>

            <div className='container'>
                {token && !showTrack ? (
                    <div>
                        <h1>How are you feeling today?</h1>
                        <form onSubmit={(e) => findRecommendation(e)}>
                            <Box sx={{ margin: '0 auto', width: 600, marginTop: '50px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className='emojis' role="img" aria-label="seat">💺</span>
                                <Slider
                                    onChange={(e) => setDance(e.target.value / 10)}
                                    aria-label="Temperature"
                                    defaultValue={0}
                                    step={1}
                                    marks
                                    min={0}
                                    max={10}
                                    sx={{ color: '#8C52FF', marginLeft: '50px', marginRight: '50px' }}
                                />
                                <span className='emojis' role="img" aria-label="dancer">💃</span>
                            </Box>
    
                            <Box sx={{ margin: '0 auto', width: 600, marginTop: '50px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className='emojis' role="img" aria-label="sleep">💤</span>
                                <Slider
                                    onChange={(e) => setEnergy(e.target.value / 10)}
                                    aria-label="Temperature"
                                    defaultValue={0}
                                    step={1}
                                    marks
                                    min={0}
                                    max={10}
                                    sx={{ color: '#8C52FF', marginLeft: '50px', marginRight: '50px' }}
                                />
                                <span className='emojis' role="img" aria-label="sports">🏂</span>
                            </Box>
    
                            <Box sx={{ margin: '0 auto', width: 600, marginTop: '50px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className='emojis' role="img" aria-label="happy">😄</span>
                                <Slider
                                    onChange={(e) => setValence(e.target.value / 10)}
                                    aria-label="Temperature"
                                    defaultValue={0}
                                    step={1}
                                    marks
                                    min={0}
                                    max={10}
                                    sx={{ color: '#8C52FF', marginLeft: '50px', marginRight: '50px' }}
                                />
                                <span className='emojis' role="img" aria-label="crying">😭</span>
                            </Box>
    
                            <button type='submit' className='search-button'>Get Today's MoodTrack</button>
                        </form>
                    </div>
            ) : null}
            </div>
        </div>
    </div>
  )
}
