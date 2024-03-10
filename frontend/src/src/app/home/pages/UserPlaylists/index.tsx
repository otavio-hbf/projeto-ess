import { Stack } from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import PlaylistItem from "../../../../shared/components/PlaylistItem"; // Importando o componente PlaylistItem
import PlaylistHeader from "../../components/UserPlaylistsOptions"; // Importando o componente PlaylistHeader
import { PlaylistContext } from "../../context/PlaylistContext";
import styles from "./index.module.css";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

/**
 * Renders a list of playlists.
 */
const PlaylistPage = () => {
  const { service, state } = useContext(PlaylistContext);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const cookies = new Cookies();

  useEffect(() => {
    service.getUserPlaylists(cookies.get("userId").toString());
  }, [service]);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      className={styles.container}
    >
      <PlaylistHeader />
      <div className={styles.listContainer} data-cy="playlist-list">
        {state.getUserPlaylistsRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: (states) => (
            <span>Erro ao carregar as playlists! {states.message} </span>
          ),
          succeeded: (playlists) => (
            <>
              {playlists.length > 0 ? (
                playlists.map((playlist) => {
                  return (
                    <div
                      key={playlist.id}
                      className={styles.listItem}
                      data-cy={`playlist-item-${playlist.name}`}
                    >
                      <PlaylistItem
                        playlist={playlist}
                        userId={cookies.get("userId").toString()}
                      />
                    </div>
                  );
                })
              ) : (
                <span>Nenhuma playlist encontrada!</span>
              )}
            </>
          ),
        })}
      </div>
    </Stack>
  );
};

export default PlaylistPage;
