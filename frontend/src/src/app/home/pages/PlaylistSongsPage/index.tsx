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

  useEffect(() => {
    service.getPlaylist(playlistId ? playlistId : "");
  }, [service]);


  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      className={styles.container}
    >
      {state.getPlaylistRequestStatus.maybeMap({
        loading: () => <span>Carregando...</span>,
        failed: () => <span>Erro ao carregar a playlist!</span>,
        succeeded: (playlist) => (
          <>
            <PlaylistHeader
              playlist={playlist}
            />
            <div className={styles.listContainer} data-cy="playlist-songs">
              {playlist.songsContent?.map((song) => (
                <div
                  key={song.id}
                  className={styles.listItem}
                  data-cy={`song-item-${song.title}`}
                >
                  <SongItem song={song} uid="1" playlist_id={playlist.id} />
                </div>
              ))}
            </div>
          </>
        ),
      })}
    </Stack>
  );
};

export default PlaylistSongsPage;
