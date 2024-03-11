import {
  Modal,
  ModalClose,
  Sheet,
  Typography,
  Button,
  Alert,
  IconButton,
} from "@mui/joy";
import PlaylistModel from "../../models/PlaylistModel";
import UserModel from "../../models/UserModel";
import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../../context/PlaylistContext";
import Cookies from "universal-cookie";
import Icon from "@mdi/react";
import { mdiCloseBox } from "@mdi/js";

interface ContributorsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  playlist: PlaylistModel;
}

const ContributorsModal = (props: ContributorsModalProps) => {
  const { open, setOpen, playlist } = props;
  const { service } = useContext(PlaylistContext);
  const [contributorsData, setContributorsData] = useState<UserModel[]>([]);
  const cookies = new Cookies();
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const handleAddFakeContributor = (evt) => {
    let randomContributorId: string;
    randomContributorId = ((evt.clientX % 3) + 1).toString();
    const userId = cookies.get("userId").toString();

    if (playlist.contributors.includes(randomContributorId)) {
      setErrorMessage("The user is already a contributor");
    } else if (cookies.get("userId").toString() === randomContributorId) {
      setErrorMessage("The owner can't add itself as contributor");
    } else {
      service.addContributorToPlaylist(
        playlist.id,
        randomContributorId,
        userId.toString(),
      );
      setErrorMessage("");
    }
  };

  const handleRemoveContributor = (contributorId) => {
    const userId = cookies.get("userId").toString();
    service.removeContributorToPlaylist(playlist.id, contributorId, userId);
    props.setOpen(false);
  };

  return (
    <>
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
            <div
              key={index}
              style={{ display: "flex", alignItems: "center" }}
              data-cy="contributor-name"
            >
              <Typography sx={{ mb: 1 }}>{contributor.name}</Typography>
              {playlist.createdBy === cookies.get("userId").toString() && (
                <IconButton
                  onClick={() => handleRemoveContributor(contributor.id)}
                  data-cy="remove-contributor"
                >
                  <Icon
                    path={mdiCloseBox}
                    size={1}
                    color="red"
                    style={{ display: "flex", alignItems: "center" }}
                  />
                </IconButton>
              )}
            </div>
          ))}
          {errorMessage && <Alert>{errorMessage}</Alert>}
          {playlist.createdBy !== cookies.get("userId").toString() ? null : (
            <Button
              onClick={handleAddFakeContributor}
              variant="outlined"
              color="primary"
              data-cy="add-contributor"
            >
              +Add random contributor
            </Button>
          )}
        </Sheet>
      </Modal>
    </>
  );
};

export default ContributorsModal;

/*
<IconButton onClick={handleOpenDeleteModal}
  <Icon path={mdiCloseBox} size={1.5} color="red" />
</IconButton>
*/
