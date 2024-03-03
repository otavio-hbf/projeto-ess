import { mdiHistory, mdiHomeOutline, mdiLambda, mdiMusicNote } from "@mdi/js";
import Icon from "@mdi/react";
import { Sheet, Stack, Tooltip } from "@mui/joy";
import { Link, Location, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={6}
    >
      <NavItem
        location={location}
        title="Home"
        path="/"
        icon={mdiHomeOutline}
      />
      <NavItem
        location={location}
        title="Tests"
        path="/tests"
        icon={mdiMusicNote}
      />
      <NavItem
        location={location}
        title="History"
        path="/history"
        icon={mdiHistory}
      />
      <NavItem
        location={location}
        title="Statistics"
        path="/statistics"
        icon={mdiLambda}
      />
    </Stack>
  );
};

interface NavItemProps {
  path: string;
  icon: string;
  title: string;
  location: Location<any>;
}

const NavItem = (props: NavItemProps) => {
  const isInRoute = props.path == props.location.pathname;
  return (
    <Link to={props.path}>
      <Tooltip
        title={props.title}
        variant="outlined"
        size="lg"
        arrow
        placement="right"
      >
        <Sheet
          sx={{
            background: isInRoute ? "#54104e" : "#331030",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 1,
            borderRadius: 8,
            border: isInRoute ? "1px solid #a41f99" : "1px solid #54134e",
          }}
        >
          <Icon path={props.icon} size={1.2} color="white" />
        </Sheet>
      </Tooltip>
    </Link>
  );
};

export default Navbar;
