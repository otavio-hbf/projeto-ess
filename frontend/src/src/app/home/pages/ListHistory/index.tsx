import { Stack, Typography } from "@mui/joy";
import { useContext, useEffect } from "react";
import SongItem from "../../../../shared/components/SongItem";
import HistoryOptions from "../../components/HistoryOptions";
import { HistoryContext } from "../../context/HistoryContext";
import styles from "./index.module.css";

/**
 * Renders a list of songs.
 */
const ListHistory = () => {
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
      <HistoryOptions />
      <div className={styles.listContainer} data-cy="history-list">
        {state.getHistoryRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar o histórico!</span>,
          succeeded: (histories) => (
            <>
              {histories.length > 0 ? (
                histories.map((history) => {
                  return (
                    <div
                      key={history.id}
                      className={styles.listItem}
                      data-cy={`history-item-${history.id}`}
                    >
                      <SongItem
                        song={history.song}
                        history_id={history.id}
                        uid="2"
                      />
                    </div>
                  );
                })
              ) : (
                <Typography level="body-md">
                  Você ainda não escutou nenhuma musica!
                </Typography>
              )}
            </>
          ),
        })}
      </div>
      <br />
    </Stack>
  );
};

export default ListHistory;
