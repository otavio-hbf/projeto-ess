import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import ListHistory from "./app/home/pages/ListHistory";
import StatisticsPage from "./app/home/pages/Statistics";
import { Container, Grid, Sheet, Stack, Typography } from "@mui/joy";

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
  {
    path: "/history",
    Component: ListHistory,
  },
  {
    path: "/statistics",
    Component: StatisticsPage,
  },
]);

/**
 * The root component of the application.
 * @returns {JSX.Element} - The rendered application.
 */
export default function App() {
  return (
    <Container maxWidth="xl" sx={{ height: "100vh", p: 8 }}>
      <Sheet sx={{ height: "100%", borderRadius: 16 }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid xs={2} sx={{ p: 1 }}>
            <Sheet
              sx={{ height: "100%", background: "#1e1e1e", borderRadius: 16 }}
            >
              menu lateral
            </Sheet>
          </Grid>
          <Grid xs={10}>
            <RouterProvider
              router={router}
              fallbackElement={<p>Loading...</p>}
            />
          </Grid>
        </Grid>
      </Sheet>
    </Container>
  );
}
