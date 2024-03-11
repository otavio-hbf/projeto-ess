import { mdiPlaylistMusic, mdiDelete, mdiPlayBoxMultiple } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { Sheet, Stack, Typography, IconButton } from "@mui/joy";
import { Link } from "react-router-dom";
import PlaylistModel from "../../../app/home/models/PlaylistModel";
import PlaylistDeleteModal from "../../../app/home/components/PlaylistDeleteModal";
import Cookies from "universal-cookie";

interface PlaylistItemProps {
  playlist?: PlaylistModel;
  userId?: string;
}

const PlaylistItem = ({ playlist, userId }: PlaylistItemProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          border: "2px solid #5a039d",
          background: "#262626a8",
          borderRadius: 8,
        }}
      >
        <Stack direction={"row"}>
          <Sheet sx={{ p: 4, mr: 2, background: "none" }}>
            <Icon path={mdiPlaylistMusic} size={3} color="white" />
          </Sheet>
          <Stack justifyContent={"space-evenly"}>
            <Typography level="h2">{playlist?.name}</Typography>
            <Link to={`/playlist?playlistId=${playlist?.id}`}>
              <IconButton data-cy="view-songs">
                <Icon path={mdiPlayBoxMultiple} size={3} color="white" />
              </IconButton>
            </Link>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Sheet sx={{ pl: 5, background: "none" }}>
            <Typography level="body-lg">
              Songs: {playlist?.songs.length}
            </Typography>
            <Typography level="body-lg">
              Followers: {playlist?.followers.length}
            </Typography>
          </Sheet>
          <IconButton onClick={handleOpenDeleteModal} data-cy="delete-playlist">
            <Icon path={mdiDelete} size={1} color="white" />
          </IconButton>
        </Stack>
      </Stack>
      <PlaylistDeleteModal
        open={deleteModalOpen}
        setOpen={handleCloseDeleteModal}
        playlistId={playlist?.id || ""}
        userId={userId || ""}
      />
    </>
  );
};

export default PlaylistItem;
