import { createContext, ReactNode, useReducer, useMemo } from "react";
import { PlaylistState, PlaylistStateAction } from "./types";
import PlaylistService from "./service";
import PlaylistStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";

/**
 * Interface for the PlaylistContext properties.
 */
interface PlaylistContextProps {
  state: PlaylistState;
  prevState?: PlaylistState;
  service: PlaylistService;
}

/**
 * The PlaylistContext object that provides the PlaylistContextProps to its descendants.
 */
export const PlaylistContext = createContext<PlaylistContextProps>(
  {} as PlaylistContextProps,
);

/**
 * Interface for the PlaylistProvider properties.
 */
interface PlaylistProviderProps {
  children: ReactNode;
}

/**
 * The PlaylistProvider component that wraps its children with the PlaylistContext.Provider.
 * It manages the state and service for the PlaylistContext.
 *
 * @param children - The children components to be wrapped by the PlaylistProvider.
 * @returns The JSX element representing the PlaylistProvider.
 */
export const PlaylistProvider = ({ children }: PlaylistProviderProps) => {
  const [state, dispatch] = useReducer(PlaylistStateReducer, {
    getPlaylistRequestStatus: RequestStatus.idle(),
    createPlaylistRequestStatus: RequestStatus.idle(),
    getUserPlaylistsRequestStatus: RequestStatus.idle(),
    updatePlaylistRequestStatus: RequestStatus.idle(),
    deletePlaylistRequestStatus: RequestStatus.idle(),
    addSongPlaylistRequestStatus: RequestStatus.idle(),
    removeSongPlaylistRequestStatus: RequestStatus.idle(),
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
    <PlaylistContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
