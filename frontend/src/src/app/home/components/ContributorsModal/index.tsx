import { Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import PlaylistModel from "../../models/PlaylistModel";
import UserModel from "../../models/UserModel";
import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../../context/PlaylistContext";

interface ContributorsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  playlist: PlaylistModel;
}

const ContributorsModal = (props: ContributorsModalProps) => {
  const { open, setOpen, playlist } = props;
  const { service } = useContext(PlaylistContext);
  const [contributorsData, setContributorsData] = useState<UserModel[]>([]);

  useEffect(() => {
    const fetchContributorsData = async () => {
      if (open) {
        try {
          const users = await service.getUserArray(playlist.contributors);
          setContributorsData(users);
        } catch (error) {
          console.error("Error fetching contributors:", error);
          setContributorsData([]); // Reset contributors data on error
        }
      }
    };

    fetchContributorsData();
  }, [open, playlist.contributors, service]);

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
          Contributors:
        </Typography>

        {contributorsData.map((contributor, index) => (
          <Typography key={index} sx={{ mb: 1 }}>
            {contributor.name}
          </Typography>
        ))}
      </Sheet>
    </Modal>
  );
};

export default ContributorsModal;
