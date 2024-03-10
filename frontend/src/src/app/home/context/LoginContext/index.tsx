import { createContext, ReactNode, useReducer, useMemo } from "react";
import { LoginState, LoginStateAction } from "./types";
import PlaylistService from "./service";
import LoginStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";

/**
 * Interface for the LoginContext properties.
 */
interface LoginContextProps {
  state: LoginState;
  prevState?: LoginState;
  service: PlaylistService;
}

/**
 * The PlaylistContext object that provides the PlaylistContextProps to its descendants.
 */
export const LoginContext = createContext<LoginContextProps>(
  {} as LoginContextProps,
);

/**
 * Interface for the PlaylistProvider properties.
 */
interface LoginProviderProps {
  children: ReactNode;
}

/**
 * The PlaylistProvider component that wraps its children with the PlaylistContext.Provider.
 * It manages the state and service for the PlaylistContext.
 *
 * @param children - The children components to be wrapped by the PlaylistProvider.
 * @returns The JSX element representing the PlaylistProvider.
 */
export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [state, dispatch] = useReducer(LoginStateReducer, {
    getUsersRequestStatus: RequestStatus.idle(),
    createUserRequestStatus: RequestStatus.idle(),
    getUserRequestStatus: RequestStatus.idle(),
    updateUserRequestStatus: RequestStatus.idle(),
    deleteUserRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);

  const service = useMemo(
    () =>
      new PlaylistService({
        apiService,
        dispatch,
      }),
    [apiService],
  );

  return (
    <LoginContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
