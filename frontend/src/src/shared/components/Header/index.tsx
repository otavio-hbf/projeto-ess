import { Sheet, Typography } from "@mui/joy";

interface HeaderProps {
  title: string;
}
export const Header = (props) => {
  return (
    <Sheet sx={{ background: "#212121", p: 4, borderRadius: 16 }}>
      <Typography level="h2">{props.title}</Typography>
    </Sheet>
  );
};
