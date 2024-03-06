import { Modal, ModalClose, Sheet, Typography, Button } from "@mui/joy";
import { useContext } from "react";
import { PlaylistContext } from "../../context/PlaylistContext";

interface PlaylistDeleteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  playlistId: string;
  userId: string;
}

const PlaylistDeleteModal = (props: PlaylistDeleteModalProps) => {
  const { service, state } = useContext(PlaylistContext);

  const handleDeletePlaylist = () => {
    service.deletePlaylist(props.playlistId, props.userId);
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
          Excluir Playlist
        </Typography>
        <Typography
          id="modal-desc"
          textColor="text.tertiary"
          sx={{ display: "flex", justifyContent: "center", mb: 3 }}
        >
          Tem certeza de que deseja excluir esta playlist?
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          data-cy="confirm-delete-playlist"
          onClick={handleDeletePlaylist}
        >
          Confirmar Exclusão
        </Button>
      </Sheet>
    </Modal>
  );
};

export default PlaylistDeleteModal;
