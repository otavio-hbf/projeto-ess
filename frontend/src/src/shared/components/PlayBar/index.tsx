import { mdiPlayOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { IconButton, LinearProgress, Sheet, Stack, Typography } from "@mui/joy";
import SongModel from "../../../app/home/models/SongModel";

interface PlayBarProps {
  song: SongModel;
  progress: number;
}

const PlayBar = (props: PlayBarProps) => {
  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 16,
        // background: "red",
        p: 2,
      }}
    >
      <Stack>
        <IconButton onClick={() => console.log("play clicked")}>
          <Icon path={mdiPlayOutline} size={1.5} color="white" />
        </IconButton>
      </Stack>

      <Stack sx={{ mx: 6 }}>
        <Typography level="body-sm">{props.song?.artist}</Typography>
        <Typography level="title-md">{props.song?.title}</Typography>
      </Stack>

      <LinearProgress
        sx={{ mr: 4 }}
        determinate
        value={props.progress}
        color="neutral"
        variant="solid"
      />
    </Sheet>
  );
};

export default PlayBar;
