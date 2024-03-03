import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { HistoryContext } from "../../context/HistoryContext";
import { Stack } from "@mui/joy";
import SongItem from "../../../../shared/components/SongItem";

/**
 * Renders a list of songs.
 */
const MostPlayedPage = () => {
  const { service, state } = useContext(HistoryContext);

  useEffect(() => {
    service.getHistory("2");
  }, [service]);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      className={styles.container}
    >
      <div className={styles.listContainer}>
        {state.getHistoryRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar o histórico!</span>,
          succeeded: (histories) => (
            <>
              {histories.map((history) => {
                return (
                  <div key={history.id} className={styles.listItem}>
                    <SongItem
                      song={history.song}
                      history_id={history.id}
                      uid="2"
                    />
                  </div>
                );
              })}
            </>
          ),
        })}
      </div>
      <br />
    </Stack>
  );
};

export default MostPlayedPage;
