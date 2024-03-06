import Header from "../../../../shared/components/Header";
import { mdiBug, mdiRename } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Alert } from "@mui/joy";
import { useContext, useState } from "react";
import { PlaylistContext } from "../../context/PlaylistContext";
import RenamePlaylistModal from "../RenamePlaylistModal";
import PlaylistModel from "../../models/PlaylistModel";

interface PlaylistProps {
  playlist: PlaylistModel;
}

const PlaylistHeader = ({ playlist }: PlaylistProps) => {
  const { service } = useContext(PlaylistContext);
  const [renamePlaylistOpen, setRenamePlaylistOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddFakeSong = (evt) => {
    let randomSongId: string;
    randomSongId = ((evt.clientX % 10) + 1).toString();

    if (playlist.songs.includes(randomSongId)) {
      setErrorMessage("Song already added! Try again!");
    } else {
      service.addSongToPlaylist(playlist.id, randomSongId, "1");
      setErrorMessage("");
    }
  };

  return (
    <>
      <Header title={playlist.name}>
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
          data-cy="rename-playlist"
          startDecorator={<Icon path={mdiRename} size={1} />}
        >
          Renomear Playlist
        </Button>
      </Header>
      <RenamePlaylistModal
        open={renamePlaylistOpen}
        setOpen={setRenamePlaylistOpen}
        playlist={playlist}
      />
    </>
  );
};

export default PlaylistHeader;
