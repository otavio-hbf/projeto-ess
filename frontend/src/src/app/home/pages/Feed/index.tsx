import { Stack, Typography } from "@mui/joy";
import { useContext, useEffect } from "react";
import { FeedContext } from "../../context/FeedContext";
import styles from "./index.module.css";
import FeedSongItem from "../../components/FeedSongItem";

const Feed = () => {
  const { service, state } = useContext(FeedContext);

  useEffect(() => {
    service.getSongs();
    service.getReccomendations("2");
  }, [service]);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      className={styles.container}
    >
      <Typography level="h1">Músicas</Typography>
      <div className={styles.listContainer}>
        {state.getSongsRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar as músicas!</span>,
          succeeded: (songs) => (
            <>
              <ul className={styles.songList} >
                {songs.map((song) => (
                  <li key={song.id} className={styles.songListItem} data-cy="music-section">
                    <FeedSongItem song={song} />
                  </li>
                ))}
              </ul>
            </>
          ),
        })}
      </div>

      <Typography level="h1">Para você</Typography>
      <div className={styles.listContainer}>
        {state.getRecommendationsRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar as músicas!</span>,
          succeeded: (songs) => (
            <>
              <ul className={styles.songList} >
                {songs.map((song) => (
                  <li key={song.id} className={styles.songListItem} data-cy="recommendations">
                    <FeedSongItem song={song} />
                  </li>
                ))}
              </ul>
            </>
          ),
        })}
      </div>
    </Stack>
  );
};

export default Feed;
