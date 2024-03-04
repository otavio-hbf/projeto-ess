import { Button } from "@mui/joy";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import Header from "../../../../shared/components/Header";
import CreatePlaylistModal from "../CreatePlaylistModal";

const UserPlaylistsOptions = () => {
  const [createPlaylistOpen, setCreatePlaylistOpen] = useState<boolean>(false);

  return (
    <>
      <Header title="My Playlists">
        <Button
          onClick={() => setCreatePlaylistOpen(true)}
          variant="outlined"
          color="primary"
          startDecorator={<Icon path={mdiPlus} size={1} />}
        >
          Criar Nova Playlist
        </Button>
      </Header>
      <CreatePlaylistModal
        open={createPlaylistOpen}
        setOpen={setCreatePlaylistOpen}
      />
    </>
  );
};

export default UserPlaylistsOptions;
