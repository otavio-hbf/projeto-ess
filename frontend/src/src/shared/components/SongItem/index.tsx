import { mdiClose, mdiMusicNote } from "@mdi/js";
import Icon from "@mdi/react";
import { IconButton, Sheet, Stack, Typography } from "@mui/joy";
import SongModel from "../../../app/home/models/SongModel";
import { formatTime } from "../../utils/timeUtils";

interface SongItemProps {
  song?: SongModel;
}

const SongItem = ({ song }: SongItemProps) => {
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
          <IconButton>
            <Icon path={mdiClose} size={1} color="white" />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};

export default SongItem;
