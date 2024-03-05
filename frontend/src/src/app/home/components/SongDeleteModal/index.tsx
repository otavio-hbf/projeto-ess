import { Modal, ModalClose, Sheet, Typography, Button } from "@mui/joy";
import { useContext } from "react";
import { PlaylistContext } from "../../context/PlaylistContext";

interface SongDeleteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  playlistId: string;
  userId: string;
  songId: string;
}

const SongDeleteModal = (props: SongDeleteModalProps) => {
  const { service, state } = useContext(PlaylistContext);

  const handleDeletePlaylist = () => {
    service.removeSongToPlaylist(props.playlistId, props.songId, props.userId);
    props.setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={props.open}
      onClose={() => props.setOpen(false)}
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          Excluir Musica
        </Typography>
        <Typography
          id="modal-desc"
          textColor="text.tertiary"
          sx={{ display: "flex", justifyContent: "center", mb: 3 }}
        >
          Tem certeza de que deseja excluir esta musica dessa playlist?
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleDeletePlaylist}
        >
          Confirmar Exclusão
        </Button>
      </Sheet>
    </Modal>
  );
};

export default SongDeleteModal;
