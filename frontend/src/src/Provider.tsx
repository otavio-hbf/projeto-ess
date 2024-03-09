import { ReactNode } from "react";
import { SearchProvider } from "./app/home/context/SearchContext";
import { HistoryProvider } from "./app/home/context/HistoryContext";
import { PlaylistProvider } from "./app/home/context/PlaylistContext";
import { FeedProvider } from "./app/home/context/FeedContext";
import { SongProvider } from "./app/home/context/SongContext";

/**
 * Provider component that wraps the application and provides the necessary context.
 *
 * @param children - The child components to be wrapped by the Provider.
 * @returns The Provider component.
 */
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SongProvider>
      <SearchProvider>
        <FeedProvider>
          <PlaylistProvider>
            <HistoryProvider>{children}</HistoryProvider>
          </PlaylistProvider>
        </FeedProvider>
      </SearchProvider>
    </SongProvider>
  );
};

export default Provider;
