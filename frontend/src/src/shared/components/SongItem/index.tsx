import { mdiClose, mdiMusicNote, mdiCloseBox } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState } from "react";
import { IconButton, Sheet, Stack, Typography } from "@mui/joy";
import SongModel from "../../../app/home/models/SongModel";
import { formatTime } from "../../utils/timeUtils";
import { HistoryContext } from "../../../app/home/context/HistoryContext";
import { useContext } from "react";
import SongDeleteModal from "../../../app/home/components/SongDeleteModal";
import { useSongContext } from "../../../app/home/context/SongContext";


interface SongItemProps {
  song: SongModel | null;
  progress?: number;
  uid?: string;
  history_id?: string;
  playlist_id?: string;
  onSongChange?: (song: SongModel) => void;
  onProgressChange?: (progress: number) => void;
}

const SongItem = (props: SongItemProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { setSelectedSong } = useSongContext();

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleClick = () => {
    if (props.song) {
      setSelectedSong(props.song);
    }
  };

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        onClick={handleClick} // Call handleClick when the song item is clicked
      >
        <Stack direction={"row"}>
          <Sheet sx={{ p: 1, mr: 1, background: "#ffffff00" }}>
            <Icon path={mdiMusicNote} size={1} color="white" />
          </Sheet>
          <Stack>
            <Typography level="body-sm">{props.song?.artist}</Typography>
            <Typography level="title-md">{props.song?.title}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <Sheet sx={{ pl: 8, background: "#ffffff00" }}>
            <Typography level="body-sm">
              {formatTime(props.song?.duration)}
            </Typography>
            <Typography level="body-sm">{props.song?.genre}</Typography>
          </Sheet>
          {props.song ? (
            <IconButton onClick={() => setSelectedSong(props.song)}>
              <Icon path={mdiClose} size={1} color="white" />
            </IconButton>
          ) : null}
          <IconButton onClick={handleOpenDeleteModal}>
            <Icon path={mdiCloseBox} size={1.5} color="red" />
          </IconButton>
        </Stack>
      </Stack>
      {props.uid && props.playlist_id && props.song ? (
        <SongDeleteModal
          open={deleteModalOpen}
          setOpen={handleCloseDeleteModal}
          playlistId={props.playlist_id}
          userId={props.uid}
          songId={props.song.id}
        />
      ) : null}
    </>
  );
};

export default SongItem;
