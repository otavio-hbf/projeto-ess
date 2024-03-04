import { Container, Grid, Sheet, Stack } from "@mui/joy";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import styles from "./app.module.css";
import CreateTest from "./app/home/pages/CreateTest";
import ListHistory from "./app/home/pages/ListHistory";
import ListTests from "./app/home/pages/ListTests";
import MostPlayedPage from "./app/home/pages/MostPlayed";
import Feed from "./app/home/pages/Feed";
import Navbar from "./shared/components/Navbar";
import UserConfigPage from "./app/home/pages/UserConfigPage";
import UserPlaylists from "./app/home/pages/UserPlaylists";
import PlayBar from "./shared/components/PlayBar";
import SongModel from "./app/home/models/SongModel";

const AppWrapper = () => {
  // Replace this with the song you want to show playing.
  const fakeSong = new SongModel({
    artist: "The Beatles",
    title: "Hey Jude",
    duration: 300,
    genre: "Rock",
    id: "1",
    times_ever_played: 32,
  });

  return (
    <Container maxWidth={"xl"} sx={{ height: "90vh", p: 8 }}>
      <Sheet
        sx={{
          height: "100%",
          borderRadius: 16,
          boxShadow: "rgb(144 4 188 / 60%) 0px 0px 0px 12px",
        }}
      >
        <Grid
          container
          direction="row"
          sx={{ height: "100%", borderRadius: 16 }}
          className={styles.containers}
        >
          <Grid xs={"auto"} sx={{ p: 1 }}>
            <Sheet
              sx={{
                height: "100%",
                background: "#780e6fb8",
                borderRadius: 16,
                py: 4,
                px: 2,
                border: "2px solid #9e0591",
              }}
            >
              <Navbar />
            </Sheet>
          </Grid>
          <Grid xs>
            <Outlet />
          </Grid>
        </Grid>
      </Sheet>
      <Sheet
        sx={{
          mt: 5,
          borderRadius: 16,
          // height: "64px",
          boxShadow: "rgb(144 4 188 / 60%) 0px 0px 0px 12px",
        }}
      >
        <PlayBar song={fakeSong} progress={80} />
      </Sheet>
    </Container>
  );
};

/**
 * Creates a browser router and defines the routes for the application.
 * @param {Array} routes - An array of route objects containing the path and component.
 * @returns {Object} - The router object.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    children: [
      {
        path: "/",
        Component: CreateTest,
      },
      {
        path: "/create-test",
        Component: CreateTest,
      },
      {
        path: "/MyPlaylists",
        Component: UserPlaylists,
      },
      {
        path: "/history",
        Component: ListHistory,
      },
      {
        path: "/most-played",
        Component: MostPlayedPage,
      },
      {
        path: "/my-profile",
        Component: UserConfigPage,
      },
      {
        path: "/feed",
        Component: Feed,
      },
    ],
  },
]);

/**
 * The root component of the application.
 * @returns {JSX.Element} - The rendered application.
 */
export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
