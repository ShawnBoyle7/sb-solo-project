import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ArtistDiv from "../ArtistDiv"
import AlbumDiv from "../AlbumDiv"
import PlaylistDiv from "../PlaylistDiv";
import './Library.css'

const Library = () => {
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.users[sessionUser.id]);

    const playlistsSlice = useSelector(state => state.playlists);
    const allPlaylists = Object.values(playlistsSlice);

    const userPlaylists = allPlaylists?.filter(playlist => playlist?.userId === +user?.id);
    const followedArtists = user?.Artists;
    const likedAlbums = user?.Albums

    return (
        <>
            <div className="library-page">
                <Switch>
                    <Route path="/library/playlists">
                        <div className="library-header-div">
                            <h1 className="library-header">Playlists</h1>
                        </div>
                        <div className="library-playlists-section">
                            {userPlaylists ? userPlaylists?.map(playlist =>
                                <PlaylistDiv playlist={playlist} sessionUser={sessionUser}/>)
                            : <></>}
                        </div>
                    </Route>

                    <Route path="/library/artists">
                        <div className="library-header-div">
                            <h1 className="library-header">Playlists</h1>
                        </div>
                        <div className="library-artists-section">
                            {followedArtists ? followedArtists?.map(artist =>
                                <ArtistDiv artist={artist}/>)
                            : <></>}
                        </div>
                    </Route>

                    <Route path="/library/albums">
                        <div className="library-header-div">
                            <h1 className="library-header">Albums</h1>
                        </div>
                        <div className="library-albums-section">
                            {likedAlbums ? likedAlbums?.map(album =>
                                <AlbumDiv album={album}/>)
                            : <></>}
                        </div>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default Library;