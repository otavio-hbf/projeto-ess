import { createContext, ReactNode, useReducer, useMemo } from "react";
import { HotPageState as HotPageState } from "./types";
import HotPageService from "./service";
import HotPageStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";

/**
 * Interface for the HotPageContext properties.
 */
interface HotPageContextProps {
  state: HotPageState;
  prevState?: HotPageState;
  service: HotPageService;
}

/**
 * The HotPageContext object that provides the HotPageContextProps to its descendants.
 */
export const HotPageContext = createContext<HotPageContextProps>(
  {} as HotPageContextProps,
);

/**
 * Interface for the HotPageProvider properties.
 */
interface HotPageProviderProps {
  children: ReactNode;
}

/**
 * The HotPageProvider component that wraps its children with the HotPageContext.Provider.
 * It manages the state and service for the HotPageContext.
 *
 * @param children - The children components to be wrapped by the HotPageProvider.
 * @returns The JSX element representing the HotPageProvider.
 */
export const HotPageProvider = ({ children }: HotPageProviderProps) => {
  const [state, dispatch] = useReducer(HotPageStateReducer, {
    getHotSongsRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);

  const service = useMemo(
    () =>
      new HotPageService({
        apiService,
        dispatch,
      }),
    [apiService],
  );

  return (
    <HotPageContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </HotPageContext.Provider>
  );
};
