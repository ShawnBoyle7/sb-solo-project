import React, { useEffect } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import './Album.css';

const Album = ({ nowPlaying, setNowPlaying, isPlaying, setIsPlaying, albums }) => {
    const { albumId } = useParams();
    const album = albums?.find(album => album?.Artist?.id === +albumId)
    const songs = album?.Songs

    let audio;

    // Use effect to grab the audio to ensure it's loaded first to avoid grabbing a null audio element
    useEffect(() => {
        audio = document.querySelector("audio")
    });

    const playSong = (e) => {
        const song = songs?.find(song => song?.id === +e?.target?.id)
        setNowPlaying(song)

        audio.play()
        setIsPlaying(true)
    }

    const stopSong = () => {
        audio.pause()
        setIsPlaying(false)
    }

    return (
        <>
            <div className="album-page-header">
                <div className="album-art-div">
                    <img className="album-art" src={album?.imgUrl}/>
                </div>
                <div className="album-details-div">
                    <span className="album-span">ALBUM</span>
                    <h1 className="album-name-header">{album?.name}</h1>
                <div className="album-artist-div">
                    <div className="album-artist-art-div">
                        <img className="album-artist-art" src={album?.Artist?.imgUrl} alt="artist" />
                    </div>
                    <Link to={`artists/${album?.Artist.id}`} className="album-artist-link">
                        {album?.Artist?.name}
                    </Link>
                    <span className="album-details-year">1965</span>
                    <span className="album-details-song-amount">14 songs,</span>
                    <span className="album-details-length">35 min 32 sec</span>
                </div>
                </div>
            </div>
{/* 
            <div className="song-section">
                <div className="song-divs">
                    {songs?.map(song =>
                        <div className="songs-item" key={song.id}>
                            <Link to={`/songs/${song.id}`} key={song.id}>
                                <img className="songs-image" alt={"song"} src={album.imgUrl} />
                                <div className="songs-name">{song.name}</div>
                            </Link>
                            {(!isPlaying || nowPlaying !== song) &&
                                <button id={song.id} onClick={playSong}>Play</button>
                            }
                            {(isPlaying && nowPlaying === song) &&
                                <button onClick={stopSong}>Pause</button>
                            }
                        </div>)}
                </div>
            </div> */}
        </>
    )
}

export default Album;