import { createContext, ReactNode, useReducer, useMemo } from "react";
import { HistoryState as HistoryState } from "./types";
import HistoryService from "./service";
import HistoryStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";
import { get } from "http";
import { d } from "vitest/dist/types-dea83b3d.js";
import { clear } from "console";

/**
 * Interface for the HistoryContext properties.
 */
interface HistoryContextProps {
  state: HistoryState;
  prevState?: HistoryState;
  service: HistoryService;
}

/**
 * The HistoryContext object that provides the HistoryContextProps to its descendants.
 */
export const HistoryContext = createContext<HistoryContextProps>(
  {} as HistoryContextProps,
);

/**
 * Interface for the HistoryProvider properties.
 */
interface HistoryProviderProps {
  children: ReactNode;
}

/**
 * The HistoryProvider component that wraps its children with the HistoryContext.Provider.
 * It manages the state and service for the HistoryContext.
 *
 * @param children - The children components to be wrapped by the HistoryProvider.
 * @returns The JSX element representing the HistoryProvider.
 */
export const HistoryProvider = ({ children }: HistoryProviderProps) => {
  const [state, dispatch] = useReducer(HistoryStateReducer, {
    createHistoryRequestStatus: RequestStatus.idle(),
    getHistoryRequestStatus: RequestStatus.idle(),
    getStatisticsRequestStatus: RequestStatus.idle(),
    deleteHistoryRequestStatus: RequestStatus.idle(),
    clearHistoryRequestStatus: RequestStatus.idle(),
    getMostPlayedRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);

  const service = useMemo(
    () =>
      new HistoryService({
        apiService,
        dispatch,
      }),
    [apiService],
  );

  return (
    <HistoryContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
