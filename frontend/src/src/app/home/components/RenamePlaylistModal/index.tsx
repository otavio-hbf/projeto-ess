import {
  Modal,
  ModalClose,
  Sheet,
  Stack,
  Input,
  Typography,
  Button,
} from "@mui/joy";
import { useContext, useState, useEffect } from "react";
import { PlaylistContext } from "../../context/PlaylistContext";
import PlaylistModel from "../../models/PlaylistModel";

interface RenamePlaylistModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  playlist: PlaylistModel;
}

const RenamePlaylistModal = (props: RenamePlaylistModalProps) => {
  const { service, state } = useContext(PlaylistContext);
  const [playlistName, setPlaylistName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRenamePlaylist = async () => {
    // Verifica se o nome da playlist está vazio
    if (!playlistName.trim()) {
      setErrorMessage("O nome da playlist não pode estar vazio");
      return;
    }

    props.playlist.name = playlistName;

    service.updatePlaylist(props.playlist.id, props.playlist, "1");

    props.setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={props.open}
      onClose={() => {
        // Limpa a mensagem de erro ao fechar o modal
        setErrorMessage(null);
        props.setOpen(false);
      }}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          minWidth: 400,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h3"
          textColor="inherit"
          fontWeight="lg"
          mb={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Renomear Playlist
        </Typography>
        <Stack spacing={2}>
          <Input
            type="text"
            placeholder="Nome da Playlist"
            value={playlistName}
            data-cy="playlist-name-input"
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          {errorMessage && (
            <Typography
              textColor="red"
              sx={{ mb: 2, display: "flex", justifyContent: "center" }}
            >
              {errorMessage}
            </Typography>
          )}
          <Button
            onClick={handleRenamePlaylist}
            variant="outlined"
            color="primary"
            data-cy="confirm-rename-playlist"
          >
            Renomear Playlist
          </Button>
        </Stack>
      </Sheet>
    </Modal>
  );
};

export default RenamePlaylistModal;
