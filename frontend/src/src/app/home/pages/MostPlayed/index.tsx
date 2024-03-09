import { Stack } from "@mui/joy";
import { useContext, useEffect } from "react";
import MostPlayedItem from "../../../../shared/components/MostPlayedItem";
import MostPlayedHeader from "../../components/MostPlayedHeader";
import { HistoryContext } from "../../context/HistoryContext";
import styles from "./index.module.css";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

/**
 * Renders a list of songs.
 */
const MostPlayedPage = () => {
  const { service, state } = useContext(HistoryContext);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get("userId");
  const cookies = new Cookies();

  useEffect(() => {
    service.getMostPlayed(cookies.get("userId") ? cookies.get("userId") : "");
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
      <div className={styles.listContainer} data-cy="most-played-list">
        {state.getMostPlayedRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar o histórico!</span>,
          succeeded: (songs) => (
            <>
              {songs.length > 0
                ? songs.map((song) => {
                    return (
                      <div
                        key={song.song_id}
                        data-cy={`most-played-item-${song.song_id}`}
                        className={styles.listItem}
                      >
                        <MostPlayedItem item={song} />
                      </div>
                    );
                  })
                : "Nenhuma música encontrada!"}
            </>
          ),
        })}
      </div>
    </Stack>
  );
};

export default MostPlayedPage;
