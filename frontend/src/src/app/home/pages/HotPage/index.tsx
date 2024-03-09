import { Stack, Typography, Input } from "@mui/joy";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { HotPageContext } from "../../context/HotPageContext";
import styles from "./index.module.css";
import FeedSongItem from "../../components/FeedSongItem";
import { mdiFire } from "@mdi/js";
import Icon from "@mdi/react";

export const HotPage = () => {
  const { service, state } = useContext(HotPageContext);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [genre, setGenre] = useState<string | null>(params.get("genre"));
  const [searchValue, setSearchValue] = useState<string | null>("");

  useEffect(() => {
    service.getHotSongs(genre ? genre : "");
    console.log("gnere:", genre);
  }, [service, genre]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGenre(searchValue);
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      className={styles.container}
    >
      <Typography
        style={{
          textAlign: "center",
          margin: "0 auto",
          alignContent: "center",
        }}
        level="h1"
      >
        Em alta {<Icon path={mdiFire} size={2} />}
      </Typography>
      <div className={styles.listContainer}>
        <h2 style={{ color: "white", marginBottom: "50px" }}>
          {genre ? `Top músicas do gênero ${genre}` : "Top músicas"}
        </h2>
        <h4 style={{ color: "white", marginBottom: "5px" }}>
          Filtre as top músicas por gênero
        </h4>
        <form onSubmit={handleSubmit}>
          <div className={styles.formInputContainer}>
            <Input
              placeholder="Digite o gênero"
              size="lg"
              value={searchValue || ""}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{ width: "300px" }}
            />
          </div>
        </form>
        {state.getHotSongsRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => (
            <span style={{ color: "white" }}>
              Não há músicas com este gênero!
            </span>
          ),
          succeeded: (songs) => (
            <>
              <div
                className={styles.songList}
                style={{ display: "flex", marginTop: "30px" }}
              >
                {songs.map((song) => (
                  <li key={song.id} className={styles.songListItem}>
                    <FeedSongItem song={song} />
                  </li>
                ))}
              </div>
            </>
          ),
        })}
      </div>
    </Stack>
  );
};
