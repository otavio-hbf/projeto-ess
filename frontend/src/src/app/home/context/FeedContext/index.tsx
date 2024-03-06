import { createContext, ReactNode, useReducer, useMemo } from "react";
import { FeedState as FeedState, FeedStateAction } from "./types";
import FeedService from "./service";
import FeedStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";
import { get } from "http";
import { d } from "vitest/dist/types-dea83b3d.js";
import { clear } from "console";

/**
 * Interface for the FeedContext properties.
 */
interface FeedContextProps {
  state: FeedState;
  prevState?: FeedState;
  service: FeedService;
}

/**
 * The FeedContext object that provides the FeedContextProps to its descendants.
 */
export const FeedContext = createContext<FeedContextProps>(
  {} as FeedContextProps,
);

/**
 * Interface for the FeedProvider properties.
 */
interface FeedProviderProps {
  children: ReactNode;
}

/**
 * The FeedProvider component that wraps its children with the FeedContext.Provider.
 * It manages the state and service for the FeedContext.
 *
 * @param children - The children components to be wrapped by the FeedProvider.
 * @returns The JSX element representing the FeedProvider.
 */
export const FeedProvider = ({ children }: FeedProviderProps) => {
  const [state, dispatch] = useReducer(FeedStateReducer, {
    getSongsRequestStatus: RequestStatus.idle(),
    getRecommendationsRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);

  const service = useMemo(
    () =>
      new FeedService({
        apiService,
        dispatch,
      }),
    [apiService],
  );

  return (
    <FeedContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};
