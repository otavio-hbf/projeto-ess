import { mdiClose, mdiMusicNote, mdiCloseBox } from "@mdi/js";
import Icon from "@mdi/react";
import { IconButton, Sheet, Stack, Typography } from "@mui/joy";
import SongModel from "../../../app/home/models/SongModel";
import { formatTime } from "../../utils/timeUtils";
import { HistoryContext } from "../../../app/home/context/HistoryContext";
import { useContext } from "react";

interface SongItemProps {
  song?: SongModel;
  uid?: string;
  history_id?: string;
  playlist_id?: string;
}

const SongItem = ({ song, history_id, uid, playlist_id }: SongItemProps) => {
  const { service, state } = useContext(HistoryContext);

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
            <Typography level="body-sm">{song?.artist}</Typography>
            <Typography level="title-md">{song?.title}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <Sheet sx={{ pl: 8 }}>
            <Typography level="body-sm">
              {formatTime(song?.duration)}
            </Typography>
            <Typography level="body-sm">{song?.genre}</Typography>
          </Sheet>
          {/* Only show delete button if uid and history_id args are passed */}
          {uid && history_id ? (
            <IconButton onClick={() => service.deleteHistory(history_id, uid)}>
              <Icon path={mdiClose} size={1} color="white" />
            </IconButton>
          ) : null}
          {uid && playlist_id ? (
            <IconButton>
              <Icon path={mdiCloseBox} size={1.5} color="red" />
            </IconButton>
          ) : null}
        </Stack>
      </Stack>
    </>
  );
};

export default SongItem;
