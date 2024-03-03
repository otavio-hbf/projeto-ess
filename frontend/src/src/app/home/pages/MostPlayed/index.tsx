import { Stack } from "@mui/joy";
import { useContext, useEffect } from "react";
import MostPlayedItem from "../../../../shared/components/MostPlayedItem";
import MostPlayedHeader from "../../components/MostPlayedHeader";
import { HistoryContext } from "../../context/HistoryContext";
import styles from "./index.module.css";

/**
 * Renders a list of songs.
 */
const MostPlayedPage = () => {
  const { service, state } = useContext(HistoryContext);

  useEffect(() => {
    service.getMostPlayed("2");
  }, [service]);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      className={styles.container}
    >
      <MostPlayedHeader />
      <div className={styles.listContainer}>
        {state.getMostPlayedRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar o histórico!</span>,
          succeeded: (songs) => (
            <>
              {songs.map((song) => {
                return (
                  <div key={song.song_id} className={styles.listItem}>
                    <MostPlayedItem item={song} />
                  </div>
                );
              })}
            </>
          ),
        })}
      </div>
    </Stack>
  );
};

export default MostPlayedPage;
