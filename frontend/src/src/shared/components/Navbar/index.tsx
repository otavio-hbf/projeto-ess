import { mdiHistory, mdiHomeOutline, mdiLambda, mdiMusicNote } from "@mdi/js";
import Icon from "@mdi/react";
import { Stack } from "@mui/joy";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={8}
    >
      <NavItem path="/" icon={mdiHomeOutline} />
      <NavItem path="/tests" icon={mdiMusicNote} />
      <NavItem path="/history" icon={mdiHistory} />
      <NavItem path="/statistics" icon={mdiLambda} />
    </Stack>
  );
};

interface NavItemProps {
  path: string;
  icon: string;
}

const NavItem = (props: NavItemProps) => {
  return (
    <Link to={props.path}>
      <Icon path={props.icon} size={1.5} color="white" />
    </Link>
  );
};

export default Navbar;
