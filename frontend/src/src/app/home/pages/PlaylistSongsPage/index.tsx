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

  const pName = playlistId
    ? state.getPlaylistRequestStatus.maybeMap({
        succeeded: (playlist) => playlist.name,
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
      <PlaylistHeader playlistName={pName} />
      <div className={styles.listContainer}>
        {state.getPlaylistRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar a playlist!</span>,
          succeeded: (playlist) => (
            <>
              {playlist.songs.map((song) => (
                <div key={song} className={styles.listItem}>
                  <SongItem uid={song} />
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
