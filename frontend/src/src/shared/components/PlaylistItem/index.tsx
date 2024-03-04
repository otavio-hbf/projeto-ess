import { mdiPlaylistMusic, mdiDelete } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState } from "react";
import { Sheet, Stack, Typography, IconButton } from "@mui/joy";
import PlaylistModel from "../../../app/home/models/PlaylistModel";
import PlaylistDeleteModal from "../../../app/home/components/PlaylistDeleteModal";

interface PlaylistItemProps {
  playlist?: PlaylistModel;
}

const PlaylistItem = ({ playlist }: PlaylistItemProps) => {
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
          <IconButton onClick={handleOpenDeleteModal}>
            <Icon path={mdiDelete} size={1} color="white" />
          </IconButton>
        </Stack>
      </Stack>
      <PlaylistDeleteModal
        open={deleteModalOpen}
        setOpen={handleCloseDeleteModal}
        playlistId={playlist?.id || ""}
        userId={"1"}
      />
    </>
  );
};

export default PlaylistItem;
