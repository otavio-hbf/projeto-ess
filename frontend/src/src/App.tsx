import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";

/**
 * Creates a browser router and defines the routes for the application.
 * @param {Array} routes - An array of route objects containing the path and component.
 * @returns {Object} - The router object.
 */
const router = createBrowserRouter([
  {
    path: "*",
    Component: CreateTest,
  },
  {
    path: "/create-test",
    Component: CreateTest,
  },
  {
    path: "/tests",
    Component: ListTests,
  },
]);

/**
 * The root component of the application.
 * @returns {JSX.Element} - The rendered application.
 */
export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
