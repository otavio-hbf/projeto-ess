import { Typography } from "@mui/joy";

interface HeaderProps {
  title: string;
}
export const Header = (props) => {
  return <Typography level="h1">{props.title}</Typography>;
};
