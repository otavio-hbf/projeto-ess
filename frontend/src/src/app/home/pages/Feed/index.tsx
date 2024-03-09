import { Stack, Typography } from "@mui/joy";
import { useContext, useEffect } from "react";
import { FeedContext } from "../../context/FeedContext";
import styles from "./index.module.css";
import FeedSongItem from "../../components/FeedSongItem";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Feed = () => {
  const { service, state } = useContext(FeedContext);
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("userId")) {
      service.getSongs();
      service.getReccomendations(
        cookies.get("userId") ? cookies.get("userId") : "",
      );
    }
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
              <ul className={styles.songList}>
                {songs.map((song) => (
                  <li key={song.id} className={styles.songListItem}>
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
              <ul className={styles.songList}>
                {songs.map((song) => (
                  <li key={song.id} className={styles.songListItem}>
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
