import { useLocation } from "react-router-dom";
import { Stack } from "@mui/joy";
import { useContext, useEffect } from "react";
import SongItem from "../../../../shared/components/SongItem";
import PlaylistHeader from "../../components/PlaylistHeader";
import { PlaylistContext } from "../../context/PlaylistContext";
import styles from "./index.module.css";

const PlaylistSongsPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const playlistId = params.get("playlistId");
  const { service, state } = useContext(PlaylistContext);

  if (playlistId) {
    useEffect(() => {
      service.getPlaylist(playlistId);
    }, [service]);
  } else {
    useEffect(() => {
      service.getPlaylist("");
    }, [service]);
  }

  const songsIds = playlistId
    ? state.getPlaylistRequestStatus.maybeMap({
        succeeded: (playlist) => playlist.songs,
      })
    : []; // Se não houver playlistId

  const pName = playlistId
    ? state.getPlaylistRequestStatus.maybeMap({
        succeeded: (playlist) => playlist.name,
      })
    : "????"; // Se não houver playlistId

  const pId = playlistId
    ? state.getPlaylistRequestStatus.maybeMap({
        succeeded: (playlist) => playlist.id,
      })
    : "????"; // Se não houver playlistId

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      className={styles.container}
    >
      <PlaylistHeader
        playlistName={pName}
        playlistId={pId}
        songsIds={songsIds}
      />
      <div className={styles.listContainer}>
        {state.getPlaylistRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar a playlist!</span>,
          succeeded: (playlist) => (
            <>
              {playlist.songsContent?.map((song) => (
                <div key={song.id} className={styles.listItem}>
                  <SongItem song={song} uid="1" playlist_id={playlist.id} />
                </div>
              ))}
            </>
          ),
        })}
      </div>
    </Stack>
  );
};

export default PlaylistSongsPage;
