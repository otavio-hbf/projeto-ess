import { mdiClose, mdiMusicNote, mdiCloseBox } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState } from "react";
import { IconButton, Sheet, Stack, Typography } from "@mui/joy";
import SongModel from "../../../app/home/models/SongModel";
import { formatTime } from "../../utils/timeUtils";
import { HistoryContext } from "../../../app/home/context/HistoryContext";
import { useContext } from "react";
import SongDeleteModal from "../../../app/home/components/SongDeleteModal";
import { FeedContext } from "../../context/FeedContext";

interface FeedSongItemProps {
  song?: SongModel;
}

const FeedSongItem = ({ song }: FeedSongItemProps) => {
  const { service, state } = useContext(FeedContext);
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
