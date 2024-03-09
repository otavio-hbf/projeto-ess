import { Stack, Typography } from "@mui/joy";

interface HeaderProps {
  title: string;
  button?: any;
  children?: any;
}

const Header = ({ children, button, title }: HeaderProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={4}
      sx={{ borderRadius: 8 }}
    >
      <Stack direction="row">
      <Typography level="h2" sx={{mr:4}}>{title}</Typography>{button??null}
      </Stack>

      <Stack
        direction="row"
        justifyContent="end"
        alignItems="center"
        spacing={4}
        sx={{ borderRadius: 8, p: 1 }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default Header;
