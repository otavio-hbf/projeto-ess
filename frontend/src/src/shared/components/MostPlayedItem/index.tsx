import { mdiMusicNote } from "@mdi/js";
import Icon from "@mdi/react";
import { Sheet, Stack, Typography } from "@mui/joy";
import { useContext } from "react";
import { HistoryContext } from "../../../app/home/context/HistoryContext";
import MostPlayedModel from "../../../app/home/models/MostPlayedModel";
import { formatTime } from "../../utils/timeUtils";

interface MostPlayedItemProps {
  item?: MostPlayedModel;
}

const MostPlayedItem = ({ item }: MostPlayedItemProps) => {
  //   const { service, state } = useContext(HistoryContext);

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"}>
          <Sheet sx={{ p: 1, mr: 1 }}>
            <Icon path={mdiMusicNote} size={1} color="white" />
          </Sheet>
          <Stack>
            <Typography level="body-sm">{item?.song?.artist}</Typography>
            <Typography level="title-md">{item?.song?.title}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <Sheet sx={{ pl: 8 }}>
            <Typography level="body-sm">
              {formatTime(item?.song?.duration)}
            </Typography>
            <Typography level="body-sm">{item?.song?.genre}</Typography>
          </Sheet>
          <Sheet sx={{ pl: 8, pr: 2 }}>
            <Typography level="body-sm" data-cy={"times-played"}>
              played {item?.times_played} times
            </Typography>
          </Sheet>
        </Stack>
      </Stack>
    </>
  );
};

export default MostPlayedItem;
