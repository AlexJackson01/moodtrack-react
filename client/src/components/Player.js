import SpotifyPlayer from 'react-spotify-web-playback';
import '../App.css';


export default function Player({ token, uri }) {

    if (!token) return null;

  return (
    <div className="spotify-player">
        <SpotifyPlayer
            autoPlay
            showSaveIcon
            token={token}
            uris={uri ? [uri] : []}
            styles={{
                activeColor: '#000',
                bgColor: '#FFFCEF',
                color: '#000',
                loaderColor: '#8C52FF',
                sliderColor: '#8C52FF',
                trackArtistColor: '#77838D',
                trackNameColor: '#8C52FF'
            }}
            />
    </div>
  )
}
