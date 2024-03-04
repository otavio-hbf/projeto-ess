import {
  Modal,
  ModalClose,
  Sheet,
  Stack,
  Input,
  Typography,
  Button,
} from "@mui/joy";
import { useContext, useState } from "react";
import { PlaylistContext } from "../../context/PlaylistContext";

interface CreatePlaylistModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreatePlaylistModal = ({ open, setOpen }: CreatePlaylistModalProps) => {
  const { service } = useContext(PlaylistContext);
  const [playlistName, setPlaylistName] = useState("");

  const handleCreatePlaylist = async () => {
    if (!playlistName.trim()) return;

    try {
      await service.createPlaylist({
        name: playlistName,
        createdBy: "1",
        private: false,
      });
      setOpen(false);
    } catch (error) {
      console.error("Erro ao criar a playlist:", error);
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
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
          Criar Nova Playlist
        </Typography>
        <Stack spacing={2}>
          <Input
            type="text"
            placeholder="Nome da Playlist"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <Button
            onClick={handleCreatePlaylist}
            variant="outlined"
            color="primary"
          >
            Criar Playlist
          </Button>
        </Stack>
      </Sheet>
    </Modal>
  );
};

export default CreatePlaylistModal;
