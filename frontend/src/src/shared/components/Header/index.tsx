import { Typography } from "@mui/joy";

interface HeaderProps {
  title: string;
}
export const Header = (props) => {
  return <Typography level="h2">{props.title}</Typography>;
};
