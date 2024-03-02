import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { HistoryContext } from "../../context/HistoryContext";
import SongTable from "../../components/SongTable";
import { Container, Sheet, Stack, Typography } from "@mui/joy";
import { Header } from "../../../../shared/components/Header";
import { MusicNote, MusicNoteRounded } from "@mui/icons-material";
import Icon from "@mdi/react";
import { mdiMusicNote } from "@mdi/js";

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
      <Header title="Histórico" />
      <div className={styles.listContainer}>
        {state.getHistoryRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar o histórico!</span>,
          succeeded: (tests) => (
            <>
              {tests.map((test) => {
                return (
                  <div key={test.id} className={styles.listItem}>
                    <Stack
                      direction={"row"}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Sheet sx={{ p: 1 }}>
                        <Icon path={mdiMusicNote} size={1} color="white" />
                      </Sheet>
                      <Stack sx={{ pl: 1 }}>
                        <Typography level="body-sm">
                          {test.song?.artist}
                        </Typography>
                        <Typography level="title-md">
                          {test.song?.title}
                        </Typography>
                      </Stack>
                      <Sheet sx={{ pl: 8 }}>
                        <Typography level="body-sm">
                          {test.song?.duration} segundos
                        </Typography>
                        <Typography level="body-sm">
                          {test.song?.genre}
                        </Typography>
                      </Sheet>
                    </Stack>
                  </div>
                );
              })}
            </>
          ),
        })}
      </div>
      <br />
      <Link to="/" replace>
        Página Inicial
      </Link>
    </Stack>
  );
};

export default ListHistory;
