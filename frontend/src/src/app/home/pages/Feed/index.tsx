import { Stack } from "@mui/joy";
import { useContext, useEffect } from "react";
// import FeedOptions from "../../components/FeedOptions";
import { FeedContext } from "../../context/FeedContext";
import styles from "./index.module.css";

/**
 * Renders a list of songs.
 */
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
      {/* <FeedOptions /> */}
      <div className={styles.listContainer}>
        {state.getSongsRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar as músicas!</span>,
          succeeded: (songs) => (
            <>
              <ul>
                {songs.map((song) => (
                  <li key={song.id}>{song.title}</li>
                ))}
              </ul>
            </>
          ),
        })}
      </div>
      <br />
    </Stack>
  );
};

export default Feed;
