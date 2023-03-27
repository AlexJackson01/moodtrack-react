import { useState, useEffect } from 'react'
import axios from 'axios'
import Logo from '../images/MoodTrack_logo.png'
import Spotify from '../images/Spotify_Logo.png'
import Brain from '../images/musicbrain.png'
import Player from './Player'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

export default function FindTracks ({ token, setToken }) {
  const [trackList, setTrackList] = useState([])
  const [showTrack, setShowTrack] = useState(false)
  const [dance, setDance] = useState('')
  const [energy, setEnergy] = useState('')
  const [valence, setValence] = useState('')
  const [songRecommendation, setSongRecommendation] = useState([])
  const [randomSong, setRandomSong] = useState(0)
  const [latestSongs, setLatestSongs] = useState([])
  // const [loading, setLoading] = useState(true);

  const getToken = () => {
    let urlParams = new URLSearchParams(window.location.hash.replace('#', '?'))
    let token = urlParams.get('access_token')
    window.localStorage.setItem('token', token)
    setToken(token)
  }

  const logout = e => {
    e.preventDefault()
    window.location.href = '/'

    setToken('')
    window.localStorage.removeItem('token')
  }

  const getRandomSearch = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz'
    const randomCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length)
    )
    let randomSearch = '%' + randomCharacter + '%'

    return randomSearch
  }

  const getRandomOffset = () => {
    const randomOffset = Math.floor(Math.random() * 1000)

    return randomOffset
  }

  let tracks = []
  let features = []

  const findTracks = async () => {
    // window.location.reload();

    // generate 50 random tracks
    const res = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        type: 'track',
        q: getRandomSearch(),
        limit: 50,
        offset: getRandomOffset()
      }
    })

    const data = res.data.tracks.items
    console.log(data)

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

    console.log(tracks)

    // call audio features for 50 random tracks
    for (let track of tracks) {
      const res2 = await axios.get(
        `https://api.spotify.com/v1/audio-features/${track.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      features.push(res2.data)
    }

    console.log(features)

    let combined = tracks.map((item, i) => Object.assign({}, item, features[i])) // the results from search 1 and 2 are joined together
    console.log(combined)

    setTrackList(combined)
  }

  useEffect(() => {
    getToken()
    if (token) {
      findTracks()
    }
    // setLoading(true);
  }, [token])

  const findRecommendation = e => {
    e.preventDefault()

    const filtered = trackList.filter(function (track) {
      return (
        track.danceability >= dance - 0.3 &&
        track.danceability <= dance + 0.3 &&
        track.energy >= energy - 0.3 &&
        track.energy <= energy + 0.3 &&
        track.valence >= valence - 0.3 &&
        track.valence <= valence + 0.3
      )
    })

    console.log(filtered)

    setSongRecommendation(filtered)

    // const random = songRecommendation[Math.floor(Math.random() * filtered.length)]
    // setRandomSong(random);

    console.log(songRecommendation)
    // setLatestSongs(state => ({
    //     ...state, songRecommendation
    // }))
    setShowTrack(true)
  }

  return (
    <div>
      {token && !showTrack && (
        <div className='logo-container'>
          <img
            className='moodtrack-logo-small'
            src={Logo}
            alt='moodtrack logo'
          />
          <p>
            <button className='logout-button' onClick={e => logout(e)}>
              Logout
            </button>
          </p>
          <div className='container'>
            <div>
              <h1 className='page-title'>How are you feeling today?</h1>
              <form onSubmit={e => findRecommendation(e)}>
                <Box
                  sx={{
                    margin: '0 auto',
                    width: '75%',
                    marginTop: '50px',
                    marginBottom: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span className='emojis' role='img' aria-label='seat'>
                    💺
                  </span>
                  <Slider
                    onChange={e => setDance(e.target.value / 10)}
                    aria-label='Temperature'
                    defaultValue={0}
                    step={1}
                    marks
                    min={0}
                    max={10}
                    sx={{
                      color: '#8C52FF',
                      marginLeft: '50px',
                      marginRight: '50px'
                    }}
                  />
                  <span className='emojis' role='img' aria-label='dancer'>
                    💃
                  </span>
                </Box>

                <Box
                  sx={{
                    margin: '0 auto',
                    width: '75%',
                    marginTop: '50px',
                    marginBottom: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span className='emojis' role='img' aria-label='sleep'>
                    💤
                  </span>
                  <Slider
                    onChange={e => setEnergy(e.target.value / 10)}
                    aria-label='Temperature'
                    defaultValue={0}
                    step={1}
                    marks
                    min={0}
                    max={10}
                    sx={{
                      color: '#8C52FF',
                      marginLeft: '50px',
                      marginRight: '50px'
                    }}
                  />
                  <span className='emojis' role='img' aria-label='sports'>
                    🏂
                  </span>
                </Box>

                <Box
                  sx={{
                    margin: '0 auto',
                    width: '75%',
                    marginTop: '50px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span className='emojis' role='img' aria-label='crying'>
                    😭
                  </span>
                  <Slider
                    onChange={e => setValence(e.target.value / 10)}
                    aria-label='Temperature'
                    defaultValue={0}
                    step={1}
                    marks
                    min={0}
                    max={10}
                    sx={{
                      color: '#8C52FF',
                      marginLeft: '50px',
                      marginRight: '50px'
                    }}
                  />
                  <span className='emojis' role='img' aria-label='happy'>
                    😄
                  </span>
                </Box>

                <button type='submit' className='search-button'>
                  Get Today's MoodTrack
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {token && songRecommendation.length >= 1 && showTrack && (
        <div className='logo-container'>
          <img
            className='moodtrack-logo-small'
            src={Logo}
            alt='moodtrack logo'
          />
          <p>
            <button className='logout-button' onClick={e => logout(e)}>
              Logout
            </button>
          </p>
          <div className='container'>
            <h1 className='page-title'>MoodTrack of the day</h1>
            <div>
              <img
                className='album-image'
                src={songRecommendation[0].image}
                alt={`album cover of ${songRecommendation[0].track_name} by ${songRecommendation[0].artists}`}
              />
              <h2>
                {songRecommendation[0].track_name} by{' '}
                {songRecommendation[0].artists}
              </h2>
              <Player token={token} uri={songRecommendation[0].uri} />
              <h4>
                Listen on{' '}
                <p>
                  <a href={songRecommendation[0].external}>
                    <img
                      className='spotify-logo'
                      src={Spotify}
                      alt='spotify logo'
                    />
                  </a>
                </p>
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
