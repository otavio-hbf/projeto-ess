import Header from "../../../../shared/components/Header";
import { mdiBug, mdiRename } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Alert, Typography, Stack } from "@mui/joy";
import { useContext, useState, useEffect } from "react";
import { PlaylistContext } from "../../context/PlaylistContext";
import RenamePlaylistModal from "../RenamePlaylistModal";
import PlaylistModel from "../../models/PlaylistModel";
import UserModel from "../../models/UserModel";
import Cookies from "universal-cookie";
import FollowersModal from "../FollowersModal";
import ContributorsModal from "../ContributorsModal";

interface PlaylistProps {
  playlist: PlaylistModel;
}

const PlaylistHeader = ({ playlist }: PlaylistProps) => {
  const { service } = useContext(PlaylistContext);
  const [renamePlaylistOpen, setRenamePlaylistOpen] = useState<boolean>(false);
  const [followersModalOpen, setFollowersModalOpen] = useState<boolean>(false);
  const [contributorsModalOpen, setContributorsModalOpen] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const cookies = new Cookies();
  const isFollowing =
    playlist.followers.indexOf(cookies.get("userId").toString()) > -1;
  const [creatorName, setCreatorName] = useState<string>("");

  useEffect(() => {
    const fetchCreatorName = async () => {
      try {
        const user = await service.getUser(playlist.createdBy);
        setCreatorName(user.name);
      } catch (error) {
        console.error("Error fetching creator name:", error);
        setCreatorName(""); // Reset creator name on error
      }
    };

    fetchCreatorName();
  }, [service, playlist.createdBy]);

  const handleAddFakeSong = (evt) => {
    let randomSongId: string;
    randomSongId = ((evt.clientX % 10) + 1).toString();
    const userId = cookies.get("userId");

    if (playlist.songs.includes(randomSongId)) {
      setErrorMessage("Song already added! Try again!");
    } else {
      service.addSongToPlaylist(playlist.id, randomSongId, userId.toString());
      setErrorMessage("");
    }
  };

  const handleFollow = (evt) => {
    service.followPlaylist(playlist.id, cookies.get("userId").toString());
  };

  const handleUnfollow = (evt) => {
    service.unfollowPlaylist(playlist.id, cookies.get("userId").toString());
  };

  return (
    <>
      <Header
        title={playlist.name}
        button={
          <Stack direction="row" spacing={4} alignItems="center">
            {isFollowing ? (
              <Button
                onClick={(evt) => {
                  handleUnfollow(evt);
                }}
                variant="outlined"
                color="warning"
                data-cy="unfollow-playlist"
              >
                Unfollow
              </Button>
            ) : playlist.createdBy !== cookies.get("userId").toString() ? (
              <Button
                onClick={(evt) => {
                  handleFollow(evt);
                }}
                variant="outlined"
                color="primary"
                data-cy="follow-playlist"
              >
                Follow
              </Button>
            ) : null}
            <Typography level="body-lg">Created by: {creatorName}</Typography>
            <Typography
              level="body-lg"
              onClick={() => setFollowersModalOpen(true)}
              sx={{ cursor: "pointer" }}
            >
              Followers: {playlist?.followers.length}
            </Typography>
            <Typography
              level="body-lg"
              onClick={() => setContributorsModalOpen(true)}
              sx={{ cursor: "pointer" }}
            >
              Contributors: {playlist?.contributors.length}
            </Typography>
          </Stack>
        }
      >
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
      <FollowersModal
        open={followersModalOpen}
        setOpen={setFollowersModalOpen}
        playlist={playlist}
      />
      <ContributorsModal
        open={contributorsModalOpen}
        setOpen={setContributorsModalOpen}
        playlist={playlist}
      />
    </>
  );
};

export default PlaylistHeader;
