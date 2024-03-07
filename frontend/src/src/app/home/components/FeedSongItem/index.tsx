import { mdiMusicNote } from "@mdi/js";
import Icon from "@mdi/react";
import { Sheet, Stack, Typography } from "@mui/joy";
import SongModel from "../../models/SongModel";

interface FeedSongItemProps {
  song?: SongModel;
}

const FeedSongItem = ({ song }: FeedSongItemProps) => {
  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          background: "#262626a8",
          height: "100%",
          width: 200,
          p: 2,
          borderRadius: 8,
          border: "2px solid #5a039d",
        }}
      >
        <Stack direction={"row"}>
          <Sheet sx={{ p: 1, mr: 1, background: "#ffffff00" }}>
            <Icon path={mdiMusicNote} size={1} color="white" />
          </Sheet>
          <Stack>
            <Typography level="body-sm">{song?.artist}</Typography>
            <Typography level="title-md">{song?.title}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default FeedSongItem;
