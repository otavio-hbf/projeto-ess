import Header from "../../../../shared/components/Header";
import { mdiBug, mdiRename } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Alert } from "@mui/joy";
import { useContext, useState } from "react";
import { PlaylistContext } from "../../context/PlaylistContext";
import RenamePlaylistModal from "../RenamePlaylistModal";

interface PlaylistProps {
  playlistName: string;
  playlistId: string;
  songsIds: string[];
}

const PlaylistHeader = ({
  playlistName,
  playlistId,
  songsIds,
}: PlaylistProps) => {
  const { service } = useContext(PlaylistContext);
  const [renamePlaylistOpen, setRenamePlaylistOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddFakeSong = (evt) => {
    let randomSongId: string;
    randomSongId = ((evt.clientX % 10) + 1).toString();

    if (songsIds.includes(randomSongId)) {
      setErrorMessage("Song already added! Try again!");
    } else {
      service.addSongToPlaylist(playlistId, randomSongId, "1");
      setErrorMessage("");
    }
  };

  return (
    <>
      <Header title={playlistName}>
        {errorMessage && <Alert>{errorMessage}</Alert>}
        <Button
          onClick={(evt) => {
            handleAddFakeSong(evt);
          }}
          variant="outlined"
          color="warning"
          data-cy="add-song"
          startDecorator={<Icon path={mdiBug} size={1} />}
        >
          Add fake song
        </Button>
        <Button
          onClick={() => setRenamePlaylistOpen(true)}
          variant="outlined"
          color="primary"
          startDecorator={<Icon path={mdiRename} size={1} />}
        >
          Renomear Playlist
        </Button>
      </Header>
      <RenamePlaylistModal
        open={renamePlaylistOpen}
        setOpen={setRenamePlaylistOpen}
        playlistId={playlistId}
      />
    </>
  );
};

export default PlaylistHeader;
