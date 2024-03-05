import { Stack } from "@mui/joy";
import { useContext, useEffect } from "react";
import { FeedContext } from "../../context/FeedContext";
import styles from "./index.module.css";
import FeedSongItem from "../../components/FeedSongItem";

const Feed = () => {
  const { service, state } = useContext(FeedContext);

  useEffect(() => {
    service.getSongs();
  }, [service]);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      className={styles.container}
    >
    <h1>Músicas</h1>
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
      
      <h1>Para você</h1>
      <div className={styles.listContainer}>
        
      </div>
      
      <br />
    </Stack>
  );
};

export default Feed;
