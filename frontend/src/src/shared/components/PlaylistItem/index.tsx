import { mdiPlaylistMusic } from "@mdi/js";
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
                    <Sheet sx={{ p: 1, mr: 1 }}>
                        <Icon path={mdiPlaylistMusic} size={1} color="white" />
                    </Sheet>
                    <Stack>
                        <Typography level="title-md">{playlist?.name}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} spacing={4}>
                    <Sheet sx={{ pl: 8 }}>
                        <Typography level="body-sm">Songs: {playlist?.songs.length}</Typography>
                        <Typography level="body-sm">Followers: {playlist?.followers.length}</Typography>
                    </Sheet>
                </Stack>
            </Stack>
        </>
    );
};

export default PlaylistItem;
