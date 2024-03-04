import { mdiPlaylistMusic, mdiPlaylistPlay } from "@mdi/js";
import Icon from "@mdi/react";
import { Sheet, Stack, Typography } from "@mui/joy";
import PlaylistModel from "../../../app/home/models/PlaylistModel";

interface PlaylistItemProps {
  playlist?: PlaylistModel;
}

const PlaylistItem = ({ playlist }: PlaylistItemProps) => {
  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"}>
          <Sheet sx={{ p: 4, mr: 2 }}>
            <Icon path={mdiPlaylistMusic} size={3} color="white" />
          </Sheet>
          <Stack>
            <Typography level="h2">{playlist?.name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Sheet sx={{ pl: 5 }}>
            <Typography level="body-lg">
              Songs: {playlist?.songs.length}
            </Typography>
            <Typography level="body-lg">
              Followers: {playlist?.followers.length}
            </Typography>
          </Sheet>
        </Stack>
      </Stack>
    </>
  );
};

export default PlaylistItem;
