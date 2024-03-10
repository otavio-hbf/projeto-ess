import { Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import PlaylistModel from "../../models/PlaylistModel";

interface FollowersModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  playlist: PlaylistModel;
}

const FollowersModal = (props: FollowersModalProps) => {
  const { open, setOpen, playlist } = props;

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
          Followers:
        </Typography>

        {playlist.followers.map((follower, index) => (
          <Typography key={index} sx={{ mb: 1 }}>
            {follower}
          </Typography>
        ))}
      </Sheet>
    </Modal>
  );
};

export default FollowersModal;
