import PlaylistModel from "../../models/PlaylistModel";
import Header from "../../../../shared/components/Header";

interface PlaylistProps {
  playlistName: string;
}

const PlaylistHeader = ({ playlistName }: PlaylistProps) => {
  return <Header title={playlistName} />;
};

export default PlaylistHeader;
