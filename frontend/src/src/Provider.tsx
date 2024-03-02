import { ReactNode } from "react";
import { HomeProvider } from "./app/home/context/HomeContext";

/**
 * Provider component that wraps the application and provides the necessary context.
 *
 * @param children - The child components to be wrapped by the Provider.
 * @returns The Provider component.
 */
const Provider = ({ children }: { children: ReactNode }) => {
  return <HomeProvider>{children}</HomeProvider>;
};

export default Provider;
