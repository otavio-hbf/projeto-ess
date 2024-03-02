import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { HistoryContext } from "../../context/HistoryContext";

/**
 * Renders a list of songs.
 */
const ListHistory = () => {
  const { service, state } = useContext(HistoryContext);

  useEffect(() => {
    service.getHistory("2");
  }, [service]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Histórico</h1>
      <div className={styles.listContainer}>
        {state.getHistoryRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar o histórico!</span>,
          succeeded: (tests) => (
            <>
              {tests.map((test) => {
                return (
                  <div key={test.id} className={styles.listItem}>
                    <span
                      data-cy={`test-item-${test.id}`}
                      className={styles.listItemText}
                    >
                      {test.song?.title} - {test.song?.artist}
                    </span>
                  </div>
                );
              })}
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

export default ListHistory;
