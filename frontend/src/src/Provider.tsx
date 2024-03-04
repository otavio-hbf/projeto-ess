import { ReactNode } from "react";
import { HomeProvider } from "./app/home/context/HomeContext";
import { HistoryProvider } from "./app/home/context/HistoryContext";
import { PlaylistProvider } from "./app/home/context/PlaylistContext";

/**
 * Provider component that wraps the application and provides the necessary context.
 *
 * @param children - The child components to be wrapped by the Provider.
 * @returns The Provider component.
 */
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <PlaylistProvider>
      <HistoryProvider>
        <HomeProvider>{children}</HomeProvider>
      </HistoryProvider>
    </PlaylistProvider>
  );
};

export default Provider;
