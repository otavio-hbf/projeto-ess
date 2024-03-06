import { Stack } from "@mui/joy";
import { useContext, useEffect } from "react";
import UserCard from "../../../../shared/components/UserCard";
import UserConfigHeader from "../../components/UserConfigHeader";
import { HistoryContext } from "../../context/HistoryContext";
import styles from "./index.module.css";

/**
 * Renders a list of songs.
 */
const UserConfigPage = () => {
  const { service, state } = useContext(HistoryContext);

  useEffect(() => {
    service.getUser("2");
  }, [service]);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      className={styles.container}
    >
      <UserConfigHeader />
      <div className={styles.listContainer}>
        {state.getUserRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar o histórico!</span>,
          succeeded: (user) => (
            <>
              {user ? <UserCard user={user} /> : "Nenhuma usuário encontrado!"}
            </>
          ),
        })}
      </div>
    </Stack>
  );
};

export default UserConfigPage;
