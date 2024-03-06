import { createContext, ReactNode, useReducer, useMemo } from "react";
import { SearchState as SearchState} from "./types";
import SearchService from "./service";
import searchStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";

/**
 * Interface for the SearchContext properties.
 */
interface SearchContextProps {
  state: SearchState;
  prevState?: SearchState;
  service: SearchService;
}

/**
 * The SearchContext object that provides the SearchContextProps to its descendants.
 */
export const SearchContext = createContext<SearchContextProps>(
  {} as SearchContextProps,
);

/**
 * Interface for the SearchProvider properties.
 */
interface SearchProviderProps {
  children: ReactNode;
}

/**
 * The SearchProvider component that wraps its children with the SearchContext.Provider.
 * It manages the state and service for the SearchContext.
 *
 * @param children - The children components to be wrapped by the SearchProvider.
 * @returns The JSX element representing the SearchProvider.
 */
export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [state, dispatch] = useReducer(searchStateReducer, {
    getSearchSongsRequestStatus: RequestStatus.idle(),
    getSearchPlaylistsRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);

  const service = useMemo(
    () =>
      new SearchService({
        apiService,
        dispatch,
      }),
    [apiService],
  );

  return (
    <SearchContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
