import { createContext, ReactNode, useReducer, useMemo } from "react";
import { HomeState } from "./types";
import HomeService from "./service";
import homeStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";

/**
 * Interface for the HomeContext properties.
 */
interface HomeContextProps {
  state: HomeState;
  prevState?: HomeState;
  service: HomeService;
}

/**
 * The HomeContext object that provides the HomeContextProps to its descendants.
 */
export const HomeContext = createContext<HomeContextProps>(
  {} as HomeContextProps,
);

/**
 * Interface for the HomeProvider properties.
 */
interface HomeProviderProps {
  children: ReactNode;
}

/**
 * The HomeProvider component that wraps its children with the HomeContext.Provider.
 * It manages the state and service for the HomeContext.
 *
 * @param children - The children components to be wrapped by the HomeProvider.
 * @returns The JSX element representing the HomeProvider.
 */
export const HomeProvider = ({ children }: HomeProviderProps) => {
  const [state, dispatch] = useReducer(homeStateReducer, {
    createTestRequestStatus: RequestStatus.idle(),
    getTestsRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);

  const service = useMemo(
    () =>
      new HomeService({
        apiService,
        dispatch,
      }),
    [apiService],
  );

  return (
    <HomeContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
