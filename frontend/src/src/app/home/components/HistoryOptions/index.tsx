import { mdiBug, mdiSigma, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Stack, Typography } from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import Header from "../../../../shared/components/Header";
import { HistoryContext } from "../../context/HistoryContext";
import StatisticsModal from "../StatisticsModal";
import { getRandomInt } from "../../../../shared/utils/utils";

const HistoryOptions = () => {
  const [statisticsOpen, setStatisticsOpen] = useState<boolean>(false);
  const { service, state } = useContext(HistoryContext);
  let randomNum = 0;

  useEffect(() => {
    randomNum = getRandomInt(1, 11);
  }, [state]);

  return (
    <>
      <Header title="Histórico">
        <Button
          onClick={(evt) => {
            service.createHistory(
              { user_id: "2", song_id: randomNum.toString() },
              "2",
            );
          }}
          variant="outlined"
          color="warning"
          data-cy="listen-to-song"
          startDecorator={<Icon path={mdiBug} size={1} />}
        >
          Listen to Song
        </Button>
        <Button
          onClick={() => setStatisticsOpen(true)}
          variant="outlined"
          color="neutral"
          data-cy="view-statistics"
          startDecorator={<Icon path={mdiSigma} size={1} />}
        >
          Estatísticas
        </Button>

        <Button
          onClick={() => service.clearHistory("2")}
          variant="outlined"
          color="danger"
          data-cy="clear-history"
          startDecorator={<Icon path={mdiTrashCanOutline} size={1} />}
        >
          Limpar Histórico
        </Button>
      </Header>
      <StatisticsModal open={statisticsOpen} setOpen={setStatisticsOpen} />
    </>
  );
};

export default HistoryOptions;
