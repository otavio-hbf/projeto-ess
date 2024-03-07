import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { TestFormSchema, TestFormType } from "../../forms/TestForm";
import { Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import { Stack, Typography } from "@mui/joy";
import SongModel from "../../models/SongModel";
import PlaylistModel from "../../models/PlaylistModel";
import FeedSongItem from "../../components/FeedSongItem";
import PlaylistItem from "../../../../shared/components/PlaylistItem";

const Search = () => {
  const { state, prevState, service } = useContext(SearchContext);
  const [searchSongsResults, setSearchSongsResults] = useState<SongModel[]>([]);
  const [searchPlaylistsResults, setSearchPlaylistsResults] = useState<
    PlaylistModel[]
  >([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestFormType>({
    resolver: zodResolver(TestFormSchema),
  });

  /**
   * Handles the form submission.
   * @param formData - The form data.
   */
  const onSubmit: SubmitHandler<TestFormType> = async (formData) => {
    const { name } = formData;
    const songs = await service.searchSongs(name);
    const playlists = await service.searchPlaylists(name);
    console.log(songs);
    setSearchSongsResults(songs);
    setSearchPlaylistsResults(playlists);
    reset();
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      className={styles.container}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-name"
            {...register("name")}
            placeholder="O que deseja ouvir?"
            className={styles.formInput}
          />
          {errors.name && (
            <span data-cy="input-name-error" className={styles.formError}>
              {errors.name.message}
            </span>
          )}
        </div>
      </form>

      <Typography level="h1">Músicas:</Typography>
      <div className={styles.listContainer}>
        <section className={styles.container}>
          <ul className={styles.songList}>
            {searchSongsResults.map((result) => (
              <li key={result.id}>
                <FeedSongItem song={result} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Typography level="h1">Playlists:</Typography>
      <div className={styles.listContainer}>
        <section className={styles.container}>
          <ul className={styles.songList}>
            {searchPlaylistsResults.map((result) => (
              <li key={result.id}>
                <PlaylistItem playlist={result} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Stack>
  );
};

export default Search;
