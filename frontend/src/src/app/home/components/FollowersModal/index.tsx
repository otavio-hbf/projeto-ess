import { Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import PlaylistModel from "../../models/PlaylistModel";
import UserModel from "../../models/UserModel";
import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../../context/PlaylistContext";

interface FollowersModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  playlist: PlaylistModel;
}

const FollowersModal = (props: FollowersModalProps) => {
  const { open, setOpen, playlist } = props;
  const { service } = useContext(PlaylistContext);
  const [followersData, setFollowersData] = useState<UserModel[]>([]);

  useEffect(() => {
    const fetchFollowersData = async () => {
      if (open) {
        try {
          const users = await service.getUserArray(playlist.followers);
          setFollowersData(users);
        } catch (error) {
          console.error("Error fetching followers:", error);
          setFollowersData([]); // Reset followers data on error
        }
      }
    };

    fetchFollowersData();
  }, [open, playlist.followers, service]);

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

        {followersData.map((follower, index) => (
          <Typography key={index} sx={{ mb: 1 }}>
            {follower.name}
          </Typography>
        ))}
      </Sheet>
    </Modal>
  );
};

export default FollowersModal;
