import { mdiBug, mdiPacMan, mdiSigma, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Stack, Typography } from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import StatisticsModal from "../StatisticsModal";
import { HistoryContext } from "../../context/HistoryContext";

const HistoryOptions = () => {
  const [statisticsOpen, setStatisticsOpen] = useState<boolean>(false);
  const { service, state } = useContext(HistoryContext);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
        sx={{ borderRadius: 8, p: 1 }}
      >
        <Typography level="h2">Histórico</Typography>

        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={4}
          sx={{ borderRadius: 8, p: 1 }}
        >
          <Button
            onClick={(evt) => {
              service.createHistory(
                { user_id: "2", song_id: ((evt.clientX % 10) + 1).toString() },
                "2",
              );
            }}
            variant="outlined"
            color="warning"
            startDecorator={<Icon path={mdiBug} size={1} />}
          >
            Add fake song
          </Button>
          <Button
            onClick={() => setStatisticsOpen(true)}
            variant="outlined"
            color="neutral"
            startDecorator={<Icon path={mdiSigma} size={1} />}
          >
            Estatísticas
          </Button>

          <Button
            onClick={() => service.clearHistory("2")}
            variant="outlined"
            color="danger"
            startDecorator={<Icon path={mdiTrashCanOutline} size={1} />}
          >
            Limpar Histórico
          </Button>
        </Stack>
      </Stack>
      <StatisticsModal open={statisticsOpen} setOpen={setStatisticsOpen} />
    </>
  );
};

export default HistoryOptions;
