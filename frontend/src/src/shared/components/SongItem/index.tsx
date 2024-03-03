import { Sheet, Stack, Typography } from "@mui/joy";
import SongModel from "../../../app/home/models/SongModel";
import Icon from "@mdi/react";
import { mdiMusicNote } from "@mdi/js";

interface SongItemProps {
  song?: SongModel;
}

const SongItem = ({ song }: SongItemProps) => {
  return (
    <>
      <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
        <Sheet sx={{ p: 1 }}>
          <Icon path={mdiMusicNote} size={1} color="white" />
        </Sheet>
        <Stack sx={{ pl: 1 }}>
          <Typography level="body-sm">{song?.artist}</Typography>
          <Typography level="title-md">{song?.title}</Typography>
        </Stack>
        <Sheet sx={{ pl: 8 }}>
          <Typography level="body-sm">{song?.duration} segundos</Typography>
          <Typography level="body-sm">{song?.genre}</Typography>
        </Sheet>
      </Stack>
    </>
  );
};

export default SongItem;