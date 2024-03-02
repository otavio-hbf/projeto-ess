import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { HistoryContext } from "../../context/HistoryContext";

/**
 * Renders a list of songs.
 */
const StatisticsPage = () => {
  const { service, state } = useContext(HistoryContext);

  useEffect(() => {
    service.getStatistics("2");
  }, [service]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Statistics</h1>
      <div className={styles.listContainer}>
        {state.getStatisticsRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar o histórico!</span>,
          succeeded: (stats) => (
            <>
              <ul>
                <li>Most played genre: {stats.most_played_genre}</li>
                <li>Most played song: {stats.most_played_song}</li>
                <li>Time played: {stats.time_played}</li>
              </ul>
            </>
          ),
        })}
      </div>
      <br />
      <Link to="/" replace>
        Página Inicial
      </Link>
    </section>
  );
};

export default StatisticsPage;
