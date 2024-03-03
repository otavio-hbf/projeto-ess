import { Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import { useContext, useEffect } from "react";
import { HistoryContext } from "../../context/HistoryContext";
import { formatTime } from "../../../../shared/utils/timeUtils";

interface StatisticsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const StatisticsModal = (props: StatisticsModalProps) => {
  const { service, state } = useContext(HistoryContext);

  useEffect(() => {
    service.getStatistics("2");
  }, [service, props.open]);

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={props.open}
      onClose={() => props.setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          minWidth: 400,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h3"
          textColor="inherit"
          fontWeight="lg"
          mb={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Estatísticas Detalhadas
        </Typography>
        <Typography
          id="modal-desc"
          textColor="text.tertiary"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {state.getStatisticsRequestStatus.maybeMap({
            loading: () => <span>Carregando...</span>,
            failed: () => <span>Erro ao carregar as estatísticas!</span>,
            succeeded: (stats) => (
              <>
                <ul>
                  <li>
                    <b>Most played song:</b> {stats.most_played_song}
                  </li>
                  <li>
                    <b>Most played genre:</b> {stats.most_played_genre}
                  </li>
                  <li>
                    <b>Time played:</b> {formatTime(stats.time_played)}
                  </li>
                </ul>
              </>
            ),
          })}
        </Typography>
      </Sheet>
    </Modal>
  );
};

export default StatisticsModal;
