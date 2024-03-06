import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { TestFormSchema, TestFormType } from "../../forms/TestForm";
import { Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import { Stack } from "@mui/joy";
import SongModel from "../../models/SongModel";
import PlaylistModel from "../../models/PlaylistModel";

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
      <h1>
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
          <Button data-cy="create" type="submit">
            search
          </Button>
        </form>
      </h1>
      <div className={styles.resultsContainer}>
        <section className={styles.container}>
          <h2>Resultados de musicas:</h2>
          <ul>
            {searchSongsResults.map((result) => (
              <li key={result.id}>
                {/* Display search result information */}
                {result.title}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.container}>
          <h2>Resultados de Podcasts:</h2>
          <ul>
            {searchPlaylistsResults.map((result) => (
              <li key={result.id}>
                {/* Display search result information */}
                {result.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Stack>
  );
};

export default Search;
